import React, { useState } from "react";
import { PlasmicToggleCoin } from "./plasmic/cryptocasinos/PlasmicToggleCoin";

function ToggleCoin_({ isActive: controlledIsActive, onClick, ...props }, ref) {
  const [uncontrolledIsActive, setUncontrolledIsActive] = useState(false);
  const isControlled = typeof controlledIsActive === "boolean";
  const isActive = isControlled ? controlledIsActive : uncontrolledIsActive;

  return (<PlasmicToggleCoin root={{ ref }} {...props}

    isActive={isActive}

    onClick={(event) => {
      onClick?.(event);

      if (event?.defaultPrevented || isControlled) {
        return;
      }

      setUncontrolledIsActive((previous) => !previous);
    }}


  />);
}

const ToggleCoin = React.forwardRef(ToggleCoin_);

export default ToggleCoin;
