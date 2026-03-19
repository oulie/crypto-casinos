import * as React from "react";
import { PlasmicNavbar } from "./plasmic/cryptocasinos/PlasmicNavbar";

function Navbar_({ progress = 0, ...props }, ref) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (<PlasmicNavbar navbar={{ ref }} {...props}


    progress={{
      style: {
        width: `${clampedProgress}%`,
        transition: 'width .1s ease',
      }
    }}



  />);
}

const Navbar = React.forwardRef(Navbar_);

export default Navbar;
