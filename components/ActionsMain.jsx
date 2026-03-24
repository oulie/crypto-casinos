import * as React from "react";
import { PlasmicActionsMain } from "./plasmic/cryptocasinos/PlasmicActionsMain";
import DotGrid from "./DotGrid";

function ActionsMain_(props, ref) {

  return (<PlasmicActionsMain root={{ ref }} {...props}

    wrap={
      {
        wrap: content => (
          <DotGrid
            color="#49494b"
            dotSize={2}
            gap={6}
            maxOffset={8}
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

const ActionsMain = React.forwardRef(ActionsMain_);

export default ActionsMain;
