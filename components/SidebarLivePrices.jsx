import * as React from "react";
import { PlasmicSidebarLivePrices } from "./plasmic/cryptocasinos/PlasmicSidebarLivePrices";
import CoinPriceSidebarItem from "./CoinPriceSidebarItem";

const DEFAULT_ICON = "/plasmic/cryptocasinos/images/bitcoinCircleSvg.svg";

const coinIcons = {
  ADA: "/plasmic/cryptocasinos/images/coinAdaSvg.svg",
  BTC: "/plasmic/cryptocasinos/images/bitcoinCircleSvg.svg",
  ETH: "/plasmic/cryptocasinos/images/coinEthSvg.svg",
  SOL: "/plasmic/cryptocasinos/images/coinSolSvg.svg",
  USDT: "/plasmic/cryptocasinos/images/coinUsdtSvg.svg",
  XRP: "/plasmic/cryptocasinos/images/coinXrpSvg.svg",
  BNB: "/plasmic/cryptocasinos/images/coinBnbSvg.svg",
  USDC: "/plasmic/cryptocasinos/images/coinUsdcSvg.svg",
};

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
    id: "bnb",
    name: "BNB",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "BNB",
  },
  {
    id: "xrp",
    name: "XRP",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "XRP",
  },
  {
    id: "solana",
    name: "Solana",
    priceChangePercentage24h: 0,
    priceUsd: 0,
    symbol: "SOL",
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

function getCoinIcon(symbol) {
  return {
    aspectRatio: 1,
    fullHeight: 64,
    fullWidth: 64,
    src: coinIcons[symbol] || DEFAULT_ICON,
  };
}

function SidebarLivePrices_(props, ref) {
  const { items, ...restProps } = props;
  const [coins, setCoins] = React.useState(FALLBACK_COINS);

  React.useEffect(() => {
    let isCancelled = false;

    async function loadCoins() {
      try {
        const response = await fetch("/api/coin-price-marquee");
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || "Failed to load live prices");
        }

        if (!isCancelled && Array.isArray(payload?.coins) && payload.coins.length) {
          setCoins(payload.coins.slice(0, 6));
        }
      } catch {
        // Keep fallback items if the request fails.
      }
    }

    loadCoins();

    return () => {
      isCancelled = true;
    };
  }, []);

  const sidebarItems = React.useMemo(() => {
    return coins.slice(0, 6).map((coin) => {
      const changePercentage = Number(coin.priceChangePercentage24h) || 0;

      return (
        <CoinPriceSidebarItem
          key={coin.id || coin.symbol}
          change={formatChange(changePercentage)}
          handle={coin.symbol}
          icon={getCoinIcon(coin.symbol)}
          isNegative={changePercentage < 0}
          price={formatPrice(Number(coin.priceUsd) || 0)}
          title={coin.name}
        />
      );
    });
  }, [coins]);

  const itemsOverride =
    items && typeof items === "object" && !React.isValidElement(items)
      ? { children: sidebarItems, ...items }
      : { children: items ?? sidebarItems };

  return (
    <PlasmicSidebarLivePrices
      root={{ ref }}
      {...restProps}
      items={itemsOverride}
    />
  );
}

const SidebarLivePrices = React.forwardRef(SidebarLivePrices_);

export default SidebarLivePrices;
