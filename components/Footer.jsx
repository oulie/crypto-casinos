import * as React from "react";
import { PlasmicFooter } from "./plasmic/cryptocasinos/PlasmicFooter";
import DotGrid from "./DotGrid";

function Footer_(props, ref) {

  return (<PlasmicFooter footer={{ ref }} {...props} 
  
  
    footerActions={
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <DotGrid
    dotSize={2}
    gap={6}
    baseColor="#49494b"
    activeColor="#ff9b29"
    proximity={90}
    shockRadius={0}
    shockStrength={0}
    resistance={450}
    returnDuration={2.8}
  />
</div>
    }
  
  
  />);
}

const Footer = React.forwardRef(Footer_);

export default Footer;
