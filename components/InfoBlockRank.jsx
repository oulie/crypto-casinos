import * as React from "react";
import { PlasmicInfoBlockRank } from "./plasmic/cryptocasinos/PlasmicInfoBlockRank";
import DotGrid from "./DotGrid";

function InfoBlockRank_(props, ref) {

  return (<PlasmicInfoBlockRank root={{ ref }} {...props}

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

const InfoBlockRank = React.forwardRef(InfoBlockRank_);

export default InfoBlockRank;
