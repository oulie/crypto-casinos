import React, { useState, useRef } from "react";
import { PlasmicSectionChangelog } from "./plasmic/cryptocasinos/PlasmicSectionChangelog";

function SectionChangelog_(props, ref) {

  const contentRef = useRef();
  const [open, setOpen] = useState(false);

  return (<PlasmicSectionChangelog root={{ ref }} {...props}

    content={{
      ref: contentRef
    }}
    accordion={{
      style: {
        height: open ? `${contentRef.current?.offsetHeight}px` : '0px',
        transition: 'height .4s ease',
      }
    }}

    handleRecentChanges={{
      isOpen: open,
      buttonOpen: {
        onClick: () => setOpen(!open)
      }
    }}


  />);
}

const SectionChangelog = React.forwardRef(SectionChangelog_);

export default SectionChangelog;
