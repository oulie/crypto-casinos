import * as React from "react";
import { PlasmicTogglesCoins } from "./plasmic/cryptocasinos/PlasmicTogglesCoins";

const INITIAL_ACTIVE_STATE = {
  ada: false,
  btc: false,
  dot: false,
  eth: false,
  sol: false,
  usdt: false,
  xrp: false,
};

function chainHandlers(...handlers) {
  return (event) => {
    for (const handler of handlers) {
      if (typeof handler === "function") {
        handler(event);
      }
    }
  };
}

function mergeToggleOverrides(base, extra) {
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
    merged.onClick = chainHandlers(base?.onClick, extra?.onClick);
  }

  return merged;
}

function TogglesCoins_(props, ref) {
  const [activeState, setActiveState] = React.useState(INITIAL_ACTIVE_STATE);

  const activateAllCoins = React.useCallback((event) => {
    event?.preventDefault?.();
    setActiveState((previous) =>
      Object.fromEntries(
        Object.keys(previous).map((coinKey) => [coinKey, true])
      )
    );
  }, []);

  const toggleCoin = React.useCallback((coinKey) => (event) => {
    event?.preventDefault?.();
    setActiveState((previous) => ({
      ...previous,
      [coinKey]: !previous[coinKey],
    }));
  }, []);

  return (<PlasmicTogglesCoins root={{ ref }} {...props}


    buttonAll={mergeToggleOverrides(props.buttonAll, {
      onClick: activateAllCoins
    })}

    toggles={{
      
    }}

    toggleBtc={mergeToggleOverrides(props.toggleBtc, {
      isActive: activeState.btc,
      onClick: toggleCoin("btc"),
    })}
    toggleDot={mergeToggleOverrides(props.toggleDot, {
      isActive: activeState.dot,
      onClick: toggleCoin("dot"),
    })}
    toggleUsdt={mergeToggleOverrides(props.toggleUsdt, {
      isActive: activeState.usdt,
      onClick: toggleCoin("usdt"),
    })}
    toggleAda={mergeToggleOverrides(props.toggleAda, {
      isActive: activeState.ada,
      onClick: toggleCoin("ada"),
    })}
    toggleEth={mergeToggleOverrides(props.toggleEth, {
      isActive: activeState.eth,
      onClick: toggleCoin("eth"),
    })}
    toggleXrp={mergeToggleOverrides(props.toggleXrp, {
      isActive: activeState.xrp,
      onClick: toggleCoin("xrp"),
    })}
    toggleSol={mergeToggleOverrides(props.toggleSol, {
      isActive: activeState.sol,
      onClick: toggleCoin("sol"),
    })}


  />);
}

const TogglesCoins = React.forwardRef(TogglesCoins_);

export default TogglesCoins;
