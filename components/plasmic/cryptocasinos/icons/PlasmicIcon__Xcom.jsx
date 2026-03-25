/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function XcomIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fillRule={"evenodd"}
      clipRule={"evenodd"}
      imageRendering={"optimizeQuality"}
      shapeRendering={"geometricPrecision"}
      textRendering={"geometricPrecision"}
      viewBox={"0 0 512 462.799"}
      height={"1em"}
      style={{
        fill: "currentcolor",
        ...(style || {})
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fillRule={"nonzero"}
        d={
          "M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88zm-27.556 415.805h43.505L138.363 44.527h-46.68z"
        }
      ></path>
    </svg>
  );
}

export default XcomIcon;
/* prettier-ignore-end */
