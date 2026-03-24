const COINPAPRIKA_TICKERS_URL = "https://api.coinpaprika.com/v1/tickers";

const FALLBACK_COINS = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "BTC",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "ETH",
  },
  {
    id: "tether",
    name: "Tether",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "USDT",
  },
  {
    id: "xrp",
    name: "XRP",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "XRP",
  },
  {
    id: "bnb",
    name: "BNB",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "BNB",
  },
  {
    id: "solana",
    name: "Solana",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "SOL",
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "DOGE",
  },
];

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "crypto-casinos-com/1.0",
    },
  });
  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const message =
      payload?.status?.error_message ||
      payload?.error ||
      `CoinPaprika request failed with ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function normalizeCoins(coins) {
  if (!Array.isArray(coins)) {
    throw new Error("CoinPaprika returned an invalid market payload");
  }

  return [...coins]
    .filter((coin) => Number.isFinite(Number(coin.rank)))
    .sort((left, right) => Number(left.rank) - Number(right.rank))
    .slice(0, 7)
    .map((coin) => ({
      id: coin.id,
      name: coin.name,
      priceChangePercentage24h:
        coin?.quotes?.USD?.percent_change_24h ?? 0,
      priceUsd: coin?.quotes?.USD?.price ?? 0,
      symbol: String(coin.symbol || "").toUpperCase(),
    }));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const coins = await fetchJson(COINPAPRIKA_TICKERS_URL);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json({
      coins: normalizeCoins(coins),
      source: "coinpaprika",
    });
  } catch (error) {
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=300");
    res.status(200).json({
      coins: FALLBACK_COINS,
      error: error instanceof Error ? error.message : "Unknown server error",
      source: "fallback",
    });
  }
}
