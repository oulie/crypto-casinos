import React, { useState, useRef } from "react";
import { PlasmicInfoBlockRank } from "./plasmic/cryptocasinos/PlasmicInfoBlockRank";
import DotGrid from "./DotGrid";

function InfoBlockRank_(props, ref) {
  const [isHovered, setIsHovered] = useState(false);

  return (<PlasmicInfoBlockRank root={{ ref }} {...props}
    buttonRank={{
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }}

    description={{
      className: isHovered ? 'opacity-100' : null
    }}

    wrap={
      {
        wrap: content => (
          <DotGrid
            color={isHovered ? "#747479" : "#49494b"}
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
