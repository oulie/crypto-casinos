import * as React from "react";
import { PlasmicCoinPriceSidebarItem } from "./plasmic/cryptocasinos/PlasmicCoinPriceSidebarItem";

function CoinPriceSidebarItem_(
  { change, handle, icon, isNegative, price, title, ...props },
  ref
) {
  return (
    <PlasmicCoinPriceSidebarItem
      root={{ ref }}
      {...props}
      change={{
        children: change,
        ...(props.change || {}),
      }}
      handle={handle}
      icon={icon}
      isNegative={isNegative}
      price={price}
      title={title}
    />
  );
}

const CoinPriceSidebarItem = React.forwardRef(CoinPriceSidebarItem_);

export default CoinPriceSidebarItem;
