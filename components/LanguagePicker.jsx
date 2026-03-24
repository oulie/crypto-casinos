import React, { useState, useRef } from "react";
import { PlasmicLanguagePicker } from "./plasmic/cryptocasinos/PlasmicLanguagePicker";

function LanguagePicker_(props, ref) {

  const [isOpen, setIsOpen] = useState(false);

  return (<PlasmicLanguagePicker root={{ ref }} {...props}
    isOpen={isOpen}
    buttonPicker={{
      onClick: () => {

        setIsOpen(!isOpen)
      }
    }}

  />);
}

const LanguagePicker = React.forwardRef(LanguagePicker_);

export default LanguagePicker;
