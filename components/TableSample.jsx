import React from "react";
import { PlasmicTableSample } from "./plasmic/cryptocasinos/PlasmicTableSample";
import LinkCoinIcon from "./LinkCoinIcon";

const coinIcons = [
  "/plasmic/cryptocasinos/images/bitcoinCircleSvg.svg",
  "/plasmic/cryptocasinos/images/coinEthSvg.svg",
  "/plasmic/cryptocasinos/images/coinUsdtSvg.svg",
  "/plasmic/cryptocasinos/images/coinSolSvg.svg",
  "/plasmic/cryptocasinos/images/coinXrpSvg.svg",
];

const rows = [
  {
    rank: 1,
    casino: "Stake Casino",
    rating: "★ 9.8/10",
    trustFactor: "Excellent",
    welcomeBonus: "$100,000 Daily Races",
    cryptocurrencies: "BTC, ETH, SOL, LTC, TRX +15",
  },
  {
    rank: 2,
    casino: "BC.Game",
    rating: "★ 9.6/10",
    trustFactor: "Excellent",
    welcomeBonus: "300% up to $20,000",
    cryptocurrencies: "BTC, ETH, SOL, LTC, TRX +20",
  },
  {
    rank: 3,
    casino: "Roobet",
    rating: "★ 9.5/10",
    trustFactor: "Excellent",
    welcomeBonus: "$10 Welcome Bonus",
    cryptocurrencies: "BTC, ETH, LTC +8",
  },
  {
    rank: 4,
    casino: "Rollbit",
    rating: "★ 9.4/10",
    trustFactor: "Very Good",
    welcomeBonus: "Rakeback Program",
    cryptocurrencies: "BTC, ETH, SOL, LTC +12",
  },
  {
    rank: 5,
    casino: "Duelbits",
    rating: "★ 9.3/10",
    trustFactor: "Very Good",
    welcomeBonus: "$100 + 100 Free Spins",
    cryptocurrencies: "BTC, ETH, SOL, TRX +10",
  },
  {
    rank: 6,
    casino: "Cloudbet",
    rating: "★ 9.2/10",
    trustFactor: "Very Good",
    welcomeBonus: "100% up to 5 BTC",
    cryptocurrencies: "BTC, ETH, LTC, TRX +9",
  },
  {
    rank: 7,
    casino: "Bitcasino",
    rating: "★ 9.1/10",
    trustFactor: "Very Good",
    welcomeBonus: "100% up to 1 BTC",
    cryptocurrencies: "BTC, ETH, LTC, TRX +7",
  },
  {
    rank: 8,
    casino: "Wolf.bet",
    rating: "★ 9.0/10",
    trustFactor: "Very Good",
    welcomeBonus: "150% up to $1,000",
    cryptocurrencies: "BTC, ETH, SOL, LTC +11",
  },
  {
    rank: 9,
    casino: "FortuneJack",
    rating: "★ 8.9/10",
    trustFactor: "Good",
    welcomeBonus: "1.5 BTC + 250 Free Spins",
    cryptocurrencies: "BTC, ETH, LTC, TRX +6",
  },
  {
    rank: 10,
    casino: "mBit Casino",
    rating: "★ 8.8/10",
    trustFactor: "Good",
    welcomeBonus: "110% up to 1 BTC",
    cryptocurrencies: "BTC, ETH, LTC +8",
  },
];

function TableSample_(props, ref) {
  return (
    <PlasmicTableSample
      root={{ ref }}
      {...props}
      wrap={
        <div style={wrapStyle}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
              minWidth: "900px",
              color: "#cfcfcf",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Rank</th>
                <th style={thStyle}>Casino</th>
                <th style={thStyle}>Rating</th>
                <th style={thStyle}>Trust Factor</th>
                <th style={thStyle}>Welcome Bonus</th>
                <th style={thStyle}>Coins</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const rowBackground = index % 2 === 1 ? "#191a1c" : "transparent";

                return (
                  <tr key={row.rank}>
                    <td style={getCellStyle(rowBackground, "first", "muted")}>
                      {row.rank}
                    </td>
                    <td style={getCellStyle(rowBackground, "middle", "primary")}>
                      {row.casino}
                    </td>
                    <td style={getCellStyle(rowBackground)}>
                      <span style={starStyle}>★</span>{" "}
                      <span style={primaryTextStyle}>{row.rating.replace("★ ", "")}</span>
                    </td>
                    <td style={getCellStyle(rowBackground, "middle", "positive")}>
                      {row.trustFactor}
                    </td>
                    <td style={getCellStyle(rowBackground, "middle", "primary")}>
                      {row.welcomeBonus}
                    </td>
                    <td style={getCellStyle(rowBackground, "last")}>
                      <div className={"link-coin-icon-wrap"} style={coinsWrapStyle}>
                        {coinIcons.map((iconSrc, coinIndex) => (
                          <LinkCoinIcon
                            key={`${row.rank}-${coinIndex}`}
                            icon={{
                              src: iconSrc,
                              fullWidth: 64,
                              fullHeight: 64,
                              aspectRatio: 1,
                            }}
                          />
                        ))}
                        <span style={coinsCountStyle}>+4</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
    />
  );
}

const wrapStyle = {
  width: "100%",
  overflowX: "auto",
  background: "#101113",
  color: "#cfcfcf",
};

const thStyle = {
  textAlign: "left",
  padding: "0 16px 10px",
  fontSize: "12px",
  lineHeight: 1.2,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  fontWeight: 500,
  color: "#7d7f84",
  whiteSpace: "nowrap",
};

const baseTdStyle = {
  padding: "8px 16px",
  fontSize: "14px",
  lineHeight: 1.45,
  verticalAlign: "middle",
  color: "#cfcfcf",
};

const primaryTextStyle = {
  color: "#ffffff",
};

const starStyle = {
  color: "#ffc736",
};

const positiveTextStyle = {
  color: "#35b7aa",
};

const coinsWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0px",
  flexWrap: "nowrap",
};

const coinsCountStyle = {
  color: "#cfcfcf",
  fontSize: "14px",
  lineHeight: 1,
  marginLeft: "14px",
  whiteSpace: "nowrap",
};

function getCellStyle(background, edge = "middle", tone = "default") {
  return {
    ...baseTdStyle,
    background,
    borderTopLeftRadius: edge === "first" ? "10px" : 0,
    borderBottomLeftRadius: edge === "first" ? "10px" : 0,
    borderTopRightRadius: edge === "last" ? "10px" : 0,
    borderBottomRightRadius: edge === "last" ? "10px" : 0,
    color:
      tone === "primary"
        ? primaryTextStyle.color
        : tone === "positive"
          ? positiveTextStyle.color
          : baseTdStyle.color,
  };
}

const TableSample = React.forwardRef(TableSample_);

export default TableSample;
