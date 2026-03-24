import * as React from "react";
import { PlasmicFooter } from "./plasmic/cryptocasinos/PlasmicFooter";

function Footer_(props, ref) {
  return (<PlasmicFooter footer={{ ref }} {...props}

  />);
}

const Footer = React.forwardRef(Footer_);

export default Footer;
