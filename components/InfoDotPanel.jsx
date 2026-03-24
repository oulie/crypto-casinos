import * as React from "react";
import { PlasmicInfoDotPanel } from "./plasmic/cryptocasinos/PlasmicInfoDotPanel";
import DotGrid from "./DotGrid";

function InfoDotPanel_(props, ref) {

  return (<PlasmicInfoDotPanel root={{ ref }} {...props}

    wrap={
      {
        wrap: content => (
          <DotGrid
            color="#49494b"
            dotSize={2}
            gap={6}
            maxOffset={6}
            outerRadius={28}
            style={{ borderRadius: "25px", width: "100%" }}
          >
            {content}
          </DotGrid>
        )
      }
    }

  />);
}

const InfoDotPanel = React.forwardRef(InfoDotPanel_);

export default InfoDotPanel;
