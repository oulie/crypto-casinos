import React, { useState } from "react";
import { PlasmicToggleCoin } from "./plasmic/cryptocasinos/PlasmicToggleCoin";

function ToggleCoin_(props, ref) {

  const [isActive, setIsActive] = useState(false);

  return (<PlasmicToggleCoin root={{ ref }} {...props}

    isActive={isActive}

    onClick={() => {
      setIsActive(!isActive)
    }}


  />);
}

const ToggleCoin = React.forwardRef(ToggleCoin_);

export default ToggleCoin;
