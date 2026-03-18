const PRODUCT_ID = "BTC-USD";
const COINBASE_API_BASE = `https://api.exchange.coinbase.com/products/${PRODUCT_ID}`;
const COINGECKO_BITCOIN_URL =
  "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false";
const MAX_CANDLES_PER_REQUEST = 300;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const RANGE_CONFIGS = {
  "1H": { durationMs: HOUR_MS, granularity: 60 },
  "1D": { durationMs: DAY_MS, granularity: 300 },
  "1W": { durationMs: 7 * DAY_MS, granularity: 3600 },
  "1Y": { durationMs: 365 * DAY_MS, granularity: 86400 },
};

function getRangeConfig(range) {
  const config = RANGE_CONFIGS[range];
  const endMs = Date.now();

  return {
    endMs,
    granularity: config.granularity,
    startMs: endMs - config.durationMs,
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "crypto-casinos-com/1.0",
    },
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      payload?.message || `Coinbase request failed with ${response.status}`;
    throw new Error(message);
  }

  if (payload?.message) {
    throw new Error(payload.message);
  }

  return payload;
}

async function fetchCandles({ endMs, granularity, startMs }) {
  const candlesByTimestamp = new Map();
  let buyVolume = 0;
  const requestSpanMs = granularity * 1000 * MAX_CANDLES_PER_REQUEST;
  let sellVolume = 0;

  for (let cursor = startMs; cursor < endMs; cursor += requestSpanMs) {
    const chunkEndMs = Math.min(cursor + requestSpanMs, endMs);
    const params = new URLSearchParams({
      end: new Date(chunkEndMs).toISOString(),
      granularity: String(granularity),
      start: new Date(cursor).toISOString(),
    });

    const candles = await fetchJson(`${COINBASE_API_BASE}/candles?${params}`);

    if (!Array.isArray(candles)) {
      throw new Error("Coinbase returned an invalid candle payload");
    }

    for (const candle of candles) {
      const [unixTime, , , open, close, volume] = candle;

      if (close >= open) {
        buyVolume += volume;
      } else {
        sellVolume += volume;
      }

      candlesByTimestamp.set(unixTime, {
        time: unixTime * 1000,
        value: close,
      });
    }
  }

  return {
    points: Array.from(candlesByTimestamp.values()).sort((left, right) => {
      return left.time - right.time;
    }),
    tradingActivity: {
      buyVolume,
      sellVolume,
    },
  };
}

async function fetchCurrentPrice() {
  const ticker = await fetchJson(`${COINBASE_API_BASE}/ticker`);
  return Number.parseFloat(ticker.price);
}

async function fetchCoinStats() {
  const coin = await fetchJson(COINGECKO_BITCOIN_URL);
  const marketData = coin?.market_data;

  return {
    allTimeHighUsd: marketData?.ath?.usd ?? null,
    circulatingSupplyBtc: marketData?.circulating_supply ?? null,
    marketCapUsd: marketData?.market_cap?.usd ?? null,
    volume24hUsd: marketData?.total_volume?.usd ?? null,
  };
}

function mergeCurrentPrice(points, currentPrice, endMs, granularity) {
  if (!Number.isFinite(currentPrice)) {
    return points;
  }

  if (!points.length) {
    return [{ time: endMs, value: currentPrice }];
  }

  const lastPoint = points[points.length - 1];
  const candleWindowMs = granularity * 1000;

  if (endMs - lastPoint.time > candleWindowMs * 0.75) {
    return [...points, { time: endMs, value: currentPrice }];
  }

  return [
    ...points.slice(0, -1),
    {
      ...lastPoint,
      time: endMs,
      value: currentPrice,
    },
  ];
}

function summarizeTradingActivity(activity) {
  const buyVolume = activity?.buyVolume ?? 0;
  const sellVolume = activity?.sellVolume ?? 0;
  const totalVolume = buyVolume + sellVolume;

  if (!totalVolume) {
    return {
      buyPercentage: 50,
      sellPercentage: 50,
    };
  }

  const buyPercentage = Math.round((buyVolume / totalVolume) * 100);

  return {
    buyPercentage,
    sellPercentage: 100 - buyPercentage,
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const range =
    typeof req.query.range === "string" ? req.query.range.toUpperCase() : "1D";

  if (!RANGE_CONFIGS[range]) {
    res.status(400).json({ error: "Unsupported range" });
    return;
  }

  try {
    const { endMs, granularity, startMs } = getRangeConfig(range);
    const [candlesResult, currentPriceResult, coinStatsResult] =
      await Promise.allSettled([
      fetchCandles({ endMs, granularity, startMs }),
      fetchCurrentPrice(),
      fetchCoinStats(),
    ]);

    if (candlesResult.status === "rejected") {
      throw candlesResult.reason;
    }

    if (currentPriceResult.status === "rejected") {
      throw currentPriceResult.reason;
    }

    const points = mergeCurrentPrice(
      candlesResult.value.points,
      currentPriceResult.value,
      endMs,
      granularity
    );

    if (!points.length) {
      throw new Error("No bitcoin price history returned");
    }

    const firstPrice = points[0].value;
    const latestPrice = points[points.length - 1].value;
    const change = latestPrice - firstPrice;
    const changePct = firstPrice ? (change / firstPrice) * 100 : 0;
    const stats =
      coinStatsResult.status === "fulfilled" ? coinStatsResult.value : null;

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    res.status(200).json({
      change,
      changePct,
      currentPrice: latestPrice,
      points,
      range,
      source: "coinbase-exchange",
      stats,
      tradingActivity: summarizeTradingActivity(
        candlesResult.value.tradingActivity
      ),
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown server error",
    });
  }
}
