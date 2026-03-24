import * as React from "react";
import { PlasmicSidebarLivePrices } from "./plasmic/cryptocasinos/PlasmicSidebarLivePrices";

function SidebarLivePrices_(props, ref) {

  return (<PlasmicSidebarLivePrices root={{ ref }} {...props} 
  
  
  
  
  />);
}

const SidebarLivePrices = React.forwardRef(SidebarLivePrices_);

export default SidebarLivePrices;
