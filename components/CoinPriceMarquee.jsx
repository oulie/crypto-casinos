import * as React from "react";
import { PlasmicCoinPriceMarquee } from "./plasmic/cryptocasinos/PlasmicCoinPriceMarquee";
import MarqueePriceItem from "./MarqueePriceItem";

const FALLBACK_COINS = [
  {
    id: "bitcoin",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "BTC",
  },
  {
    id: "ethereum",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "ETH",
  },
  {
    id: "tether",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "USDT",
  },
  {
    id: "xrp",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "XRP",
  },
  {
    id: "bnb",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "BNB",
  },
  {
    id: "solana",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "SOL",
  },
  {
    id: "dogecoin",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "DOGE",
  },
];

function formatPrice(priceUsd) {
  const absPrice = Math.abs(priceUsd);
  const maximumFractionDigits =
    absPrice >= 1000 ? 0 : absPrice >= 1 ? 2 : absPrice >= 0.01 ? 4 : 6;
  const minimumFractionDigits =
    absPrice >= 1000 ? 0 : absPrice >= 1 ? 2 : 0;

  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits,
    minimumFractionDigits,
    style: "currency",
  }).format(priceUsd);
}

function formatChange(changePercentage) {
  const rounded = Math.abs(changePercentage);
  return `${changePercentage >= 0 ? "+" : "-"}${rounded.toFixed(2)}%`;
}

function CoinPriceMarquee_(props, ref) {
  const { itmes, ...restProps } = props;
  const [coins, setCoins] = React.useState(FALLBACK_COINS);

  React.useEffect(() => {
    let isCancelled = false;

    async function loadCoins() {
      try {
        const response = await fetch("/api/coin-price-marquee");
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || "Failed to load coin marquee data");
        }

        if (!isCancelled && Array.isArray(payload?.coins) && payload.coins.length) {
          setCoins(payload.coins);
        }
      } catch {
        // Keep fallback data if the request fails.
      }
    }

    loadCoins();

    return () => {
      isCancelled = true;
    };
  }, []);

  const marqueeItems = React.useMemo(() => {
    return coins.map((coin) => {
      const changePercentage = Number(coin.priceChangePercentage24h) || 0;

      return (
        <MarqueePriceItem
          key={coin.id || coin.symbol}
          change={formatChange(changePercentage)}
          isNegative={changePercentage < 0}
          price={formatPrice(Number(coin.priceUsd) || 0)}
          shorthand={coin.symbol}
        />
      );
    });
  }, [coins]);

  const itemsOverride =
    itmes && typeof itmes === "object" && !React.isValidElement(itmes)
      ? { children: marqueeItems, ...itmes }
      : { children: itmes ?? marqueeItems };

  return (
    <PlasmicCoinPriceMarquee
      root={{ ref }}
      {...restProps}
      itmes={itemsOverride}
    />
  );
}

const CoinPriceMarquee = React.forwardRef(CoinPriceMarquee_);

export default CoinPriceMarquee;
