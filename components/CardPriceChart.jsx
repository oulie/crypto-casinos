import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { createPortal } from "react-dom";
import { PlasmicCardPriceChart } from "./plasmic/cryptocasinos/PlasmicCardPriceChart";

const COLOR_ORANGE = "#FF5A36";
const NEGATIVE_COLOR = "#ff8a75";
const MUTED_LINE = "rgba(255, 90, 54, 0.25)";
const GRID_COLOR = "rgba(255, 255, 255, 0.09)";
const AXIS_TICK_COLOR = "rgba(255, 255, 255, 0.32)";
const CHART_MARGIN = { top: 18, right: 0, bottom: 12, left: 0 };
const INACTIVE_RANGE_COLOR = "rgba(255, 255, 255, 0.56)";

const priceFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  style: "currency",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 2,
  notation: "compact",
  style: "currency",
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  notation: "compact",
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const tickFormatters = {
  "1H": new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }),
  "1D": new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }),
  "1W": new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }),
  "1Y": new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  }),
};

const tooltipDateFormatters = {
  "1H": new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    weekday: "short",
    year: "numeric",
  }),
  "1D": new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    weekday: "short",
    year: "numeric",
  }),
  "1W": new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    weekday: "short",
    year: "numeric",
  }),
  "1Y": new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    weekday: "short",
    year: "numeric",
  }),
};

function callAll(...handlers) {
  return (...args) => {
    for (const handler of handlers) {
      if (typeof handler === "function") {
        handler(...args);
      }
    }
  };
}

function mergeNodeProps(base, extra) {
  const merged = {
    ...(base || {}),
    ...(extra || {}),
  };

  if (base?.style || extra?.style) {
    merged.style = {
      ...(base?.style || {}),
      ...(extra?.style || {}),
    };
  }

  if (base?.onClick || extra?.onClick) {
    merged.onClick = callAll(base?.onClick, extra?.onClick);
  }

  if (base?.onKeyDown || extra?.onKeyDown) {
    merged.onKeyDown = callAll(base?.onKeyDown, extra?.onKeyDown);
  }

  return merged;
}

function formatSignedChange(value) {
  if (!Number.isFinite(value)) {
    return "--";
  }

  const absolute = priceFormatter.format(Math.abs(value));
  return `${value >= 0 ? "+" : "-"}${absolute}`;
}

function formatCompactCurrency(value) {
  if (!Number.isFinite(value)) {
    return "--";
  }

  return compactCurrencyFormatter.format(value);
}

function formatBtcSupply(value) {
  if (!Number.isFinite(value)) {
    return "--";
  }

  return `${compactNumberFormatter.format(value)} BTC`;
}

function buildTickValues(points) {
  if (!points.length) {
    return [];
  }

  const tickCount = 4;
  const ticks = new Set([points[0].time, points[points.length - 1].time]);

  for (let index = 1; index < tickCount - 1; index += 1) {
    const pointIndex = Math.round(
      (index * (points.length - 1)) / (tickCount - 1)
    );
    ticks.add(points[pointIndex].time);
  }

  return Array.from(ticks).sort((left, right) => left - right);
}

function getYDomain(points) {
  if (!points.length) {
    return { max: 1, min: 0 };
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    min = Math.min(min, point.value);
    max = Math.max(max, point.value);
  }

  const padding = Math.max((max - min) * 0.18, max * 0.01, 1);

  return {
    max: max + padding,
    min: Math.max(0, min - padding),
  };
}

function buildRangeOverride(baseProps, key, selectedRange, setSelectedRange) {
  return mergeNodeProps(baseProps, {
    "aria-pressed": String(selectedRange === key),
    children: key,
    onClick: () => setSelectedRange(key),
    onKeyDown: (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSelectedRange(key);
      }
    },
    role: "button",
    style: {
      color: selectedRange === key ? COLOR_ORANGE : INACTIVE_RANGE_COLOR,
      cursor: "pointer",
      opacity: selectedRange === key ? 1 : 0.52,
      transition: "color 160ms ease, opacity 160ms ease",
      userSelect: "none",
    },
    tabIndex: 0,
  });
}

function PortalChartTooltip({
  active,
  coordinate,
  label,
  payload,
  range,
  rect,
}) {
  if (
    !active ||
    !payload?.length ||
    !Number.isFinite(label) ||
    !Number.isFinite(coordinate?.x) ||
    !Number.isFinite(coordinate?.y) ||
    !rect ||
    typeof document === "undefined" ||
    typeof window === "undefined"
  ) {
    return null;
  }

  const point = payload.find((entry) => Number.isFinite(entry?.payload?.value));
  const value = point?.payload?.value;

  if (!Number.isFinite(value)) {
    return null;
  }

  const tooltipWidth = 188;
  const tooltipHeight = 74;
  const offset = 18;
  let left = rect.left + coordinate.x + offset;
  let top = rect.top + coordinate.y - tooltipHeight - offset;

  if (left + tooltipWidth > window.innerWidth - 12) {
    left = rect.left + coordinate.x - tooltipWidth - offset;
  }

  if (top < 12) {
    top = rect.top + coordinate.y + offset;
  }

  const portalTarget = document.getElementById("__next") || document.body;

  return createPortal(
    <div
      style={{
        background: "rgba(19, 19, 19, 0.94)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "12px",
        boxShadow: "0 18px 34px rgba(0, 0, 0, 0.28)",
        color: "#f6f1ec",
        minWidth: "164px",
        pointerEvents: "none",
        padding: "10px 12px",
        position: "fixed",
        left: Math.max(12, left),
        top: Math.min(
          Math.max(12, top),
          window.innerHeight - tooltipHeight - 12
        ),
        zIndex: 9999,
      }}
    >
      <div
        style={{
          fontSize: "12px",
          marginBottom: "4px",
          opacity: 0.66,
          whiteSpace: "nowrap",
        }}
      >
        {tooltipDateFormatters[range].format(new Date(label))}
      </div>
      <div
        style={{
          color: COLOR_ORANGE,
          fontSize: "15px",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
      >
        {priceFormatter.format(value)}
      </div>
    </div>,
    portalTarget
  );
}

function CardPriceChart_(props, ref) {
  const chartContainerRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState("1D");
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMarketData() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/bitcoin-market-data?range=${selectedRange}`,
          { signal: controller.signal }
        );
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || "Unable to fetch bitcoin data");
        }

        setMarketData(payload);
        setHoveredIndex(null);
      } catch (loadError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to fetch bitcoin data"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMarketData();

    return () => controller.abort();
  }, [selectedRange]);

  const chartData = useMemo(() => marketData?.points || [], [marketData]);
  const yDomain = useMemo(() => getYDomain(chartData), [chartData]);
  const tickValues = useMemo(() => buildTickValues(chartData), [chartData]);

  const chartSeries = useMemo(() => {
    return chartData.map((point, index) => ({
      ...point,
      activeValue:
        hoveredIndex === null || index <= hoveredIndex ? point.value : null,
      mutedValue:
        hoveredIndex !== null && index >= hoveredIndex ? point.value : null,
    }));
  }, [chartData, hoveredIndex]);

  const hoveredPoint =
    hoveredIndex !== null ? chartData[hoveredIndex] || null : null;

  const currentPrice = marketData?.currentPrice;
  const change = marketData?.change;
  const changePct = marketData?.changePct;
  const stats = marketData?.stats || {};
  const tradingActivity = marketData?.tradingActivity || {};

  const priceText =
    loading && !marketData
      ? "..."
      : error && !marketData
        ? "Unavailable"
        : Number.isFinite(currentPrice)
          ? priceFormatter.format(currentPrice)
          : "--";

  const priceChangeText =
    loading && !marketData
      ? "Fetching latest move..."
      : error && !marketData
        ? "Price change unavailable"
        : Number.isFinite(change) && Number.isFinite(changePct)
          ? `${formatSignedChange(change)} (${percentFormatter.format(changePct)}%)`
          : "--";

  const priceChangeColor =
    Number.isFinite(change) && change < 0 ? NEGATIVE_COLOR : COLOR_ORANGE;

  const buyPercentage = Number.isFinite(tradingActivity.buyPercentage)
    ? tradingActivity.buyPercentage
    : 50;
  const sellPercentage = Number.isFinite(tradingActivity.sellPercentage)
    ? tradingActivity.sellPercentage
    : 50;

  const chartDiv = (
    <div
      ref={chartContainerRef}
      style={{ height: "100%", position: "relative", width: "100%" }}
    >
      {chartData.length > 1 ? (
        <>
          <style jsx global>{`
            .recharts-wrapper:focus,
            .recharts-wrapper:focus-visible,
            .recharts-surface:focus,
            .recharts-surface:focus-visible,
            [class*="recharts-zIndex-layer"]:focus,
            [class*="recharts-zIndex-layer"]:focus-visible {
              outline: none !important;
            }
          `}</style>
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart
              accessibilityLayer={false}
              data={chartSeries}
              margin={CHART_MARGIN}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
              onMouseMove={(state) => {
                if (typeof state?.activeTooltipIndex === "number") {
                  setHoveredIndex(state.activeTooltipIndex);
                } else {
                  setHoveredIndex(null);
                }
              }}
            >
              <defs>
                <pattern
                  id="bitcoin-price-chart-pattern"
                  height="8"
                  patternUnits="userSpaceOnUse"
                  width="8"
                >
                  <circle
                    cx="1.5"
                    cy="1.5"
                    fill={COLOR_ORANGE}
                    opacity="0.45"
                    r="1.1"
                  />
                </pattern>
              </defs>

              <CartesianGrid
                horizontal={true}
                stroke={GRID_COLOR}
                strokeDasharray="3 6"
                vertical={false}
              />

              <XAxis
                axisLine={false}
                dataKey="time"
                domain={["dataMin", "dataMax"]}
                dy={16}
                minTickGap={24}
                scale="time"
                stroke="transparent"
                tick={{ fill: AXIS_TICK_COLOR, fontSize: 14 }}
                tickFormatter={(value) =>
                  tickFormatters[selectedRange].format(new Date(value))
                }
                tickLine={false}
                ticks={tickValues}
                type="number"
              />

              <YAxis domain={[yDomain.min, yDomain.max]} hide={true} type="number" />
              <Tooltip
                allowEscapeViewBox={{ x: true, y: true }}
                content={(tooltipProps) => (
                  <PortalChartTooltip
                    {...tooltipProps}
                    range={selectedRange}
                    rect={chartContainerRef.current?.getBoundingClientRect()}
                  />
                )}
                cursor={false}
                isAnimationActive={false}
                offset={0}
                wrapperStyle={{ outline: "none", zIndex: 4 }}
              />

              {hoveredPoint ? (
                <>
                  <ReferenceLine
                    stroke={GRID_COLOR}
                    strokeDasharray="3 6"
                    x={hoveredPoint.time}
                  />
                  <ReferenceLine
                    stroke="rgba(255, 255, 255, 0.14)"
                    strokeDasharray="3 6"
                    y={hoveredPoint.value}
                  />
                </>
              ) : null}

              <Area
                activeDot={{
                  fill: COLOR_ORANGE,
                  r: 4,
                  stroke: "#131313",
                  strokeWidth: 2,
                }}
                animationDuration={220}
                connectNulls={true}
                dataKey="activeValue"
                dot={false}
                fill="url(#bitcoin-price-chart-pattern)"
                isAnimationActive={true}
                stroke={COLOR_ORANGE}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                type="monotone"
              />

              <Area
                animationDuration={220}
                connectNulls={true}
                dataKey="mutedValue"
                dot={false}
                fill="transparent"
                isAnimationActive={true}
                stroke={MUTED_LINE}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.3}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>

        </>
      ) : (
        <div
          style={{
            alignItems: "center",
            color: "rgba(255, 255, 255, 0.55)",
            display: "flex",
            fontSize: "14px",
            height: "100%",
            justifyContent: "center",
            letterSpacing: "0.01em",
            width: "100%",
          }}
        >
          {loading ? "Loading bitcoin price..." : error || "No bitcoin data available"}
        </div>
      )}
    </div>
  );

  return (
    <PlasmicCardPriceChart
      {...props}
      root={mergeNodeProps(props.root, { ref })}
      price={mergeNodeProps(props.price, { children: priceText })}
      currency={mergeNodeProps(props.currency, { children: "USD" })}
      rangeHour={buildRangeOverride(
        props.rangeHour,
        "1H",
        selectedRange,
        setSelectedRange
      )}
      rangeDay={buildRangeOverride(
        props.rangeDay,
        "1D",
        selectedRange,
        setSelectedRange
      )}
      rangeWeek={buildRangeOverride(
        props.rangeWeek,
        "1W",
        selectedRange,
        setSelectedRange
      )}
      rangeYear={buildRangeOverride(
        props.rangeYear,
        "1Y",
        selectedRange,
        setSelectedRange
      )}
      priceChange={mergeNodeProps(props.priceChange, {
        children: priceChangeText,
        style: {
          color: priceChangeColor,
        },
      })}
      chartDiv={mergeNodeProps(props.chartDiv, {
        style: {
          alignSelf: "stretch",
          display: "block",
          justifyContent: "stretch",
          outline: "none",
          width: "100%",
        },
        children: chartDiv,
      })}
      marketCap={mergeNodeProps(props.marketCap, {
        children: formatCompactCurrency(stats.marketCapUsd),
      })}
      circulatingSupply={mergeNodeProps(props.circulatingSupply, {
        children: formatBtcSupply(stats.circulatingSupplyBtc),
      })}
      volume={mergeNodeProps(props.volume, {
        children: formatCompactCurrency(stats.volume24hUsd),
      })}
      allTimeHigh={mergeNodeProps(props.allTimeHigh, {
        children: Number.isFinite(stats.allTimeHighUsd)
          ? priceFormatter.format(stats.allTimeHighUsd)
          : "--",
      })}
      progressBarTradingActivity={mergeNodeProps(
        props.progressBarTradingActivity,
        {
          style: {
            background: COLOR_ORANGE,
            width: `${buyPercentage}%`,
          },
        }
      )}
      tradingActivityBuyPercentage={mergeNodeProps(
        props.tradingActivityBuyPercentage,
        {
          children: `${buyPercentage}% BUY`,
        }
      )}
      tradingActivitySellPercentage={mergeNodeProps(
        props.tradingActivitySellPercentage,
        {
          children: `${sellPercentage}% SELL`,
          style: {
            color: INACTIVE_RANGE_COLOR,
          },
        }
      )}
    />
  );
}

const CardPriceChart = React.forwardRef(CardPriceChart_);

export default CardPriceChart;
