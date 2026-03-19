import * as React from "react";
import { PlasmicSidebarTableOfContents } from "./plasmic/cryptocasinos/PlasmicSidebarTableOfContents";

function SidebarTableOfContents_({ progress = 0, ...props }, ref) {

  return (<PlasmicSidebarTableOfContents root={{ ref }} {...props}


    progressBar={{
      style: {
        height: `${progress}%`,
        transition: 'height .1s ease'
      }
    }}

    isDone={progress > 99}


  />);
}

const SidebarTableOfContents = React.forwardRef(SidebarTableOfContents_);

export default SidebarTableOfContents;
