/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function DiamondSquareIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      data-name={"Layer 1"}
      viewBox={"0 0 44.8 44.8"}
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
        d={
          "M13.27 10.73a1.58 1.58 0 0 1-.47-1.13 1.58 1.58 0 0 1 .47-1.13l8-8A1.58 1.58 0 0 1 22.4 0a1.58 1.58 0 0 1 1.13.47l8 8A1.58 1.58 0 0 1 32 9.6a1.58 1.58 0 0 1-.47 1.13l-8 8a1.58 1.58 0 0 1-1.13.47 1.58 1.58 0 0 1-1.13-.47zm10.26 15.34a1.58 1.58 0 0 0-1.13-.47 1.58 1.58 0 0 0-1.13.47l-8 8a1.58 1.58 0 0 0-.47 1.13 1.58 1.58 0 0 0 .47 1.13l8 8a1.58 1.58 0 0 0 1.13.47 1.58 1.58 0 0 0 1.13-.47l8-8A1.58 1.58 0 0 0 32 35.2a1.58 1.58 0 0 0-.47-1.13zm20.8-4.8-8-8a1.58 1.58 0 0 0-1.13-.47 1.58 1.58 0 0 0-1.13.47l-8 8a1.58 1.58 0 0 0-.47 1.13 1.58 1.58 0 0 0 .47 1.13l8 8a1.58 1.58 0 0 0 1.13.47 1.58 1.58 0 0 0 1.13-.47l8-8a1.58 1.58 0 0 0 .47-1.13 1.58 1.58 0 0 0-.47-1.13m-25.6 0-8-8a1.58 1.58 0 0 0-1.13-.47 1.58 1.58 0 0 0-1.13.47l-8 8A1.58 1.58 0 0 0 0 22.4a1.58 1.58 0 0 0 .47 1.13l8 8A1.58 1.58 0 0 0 9.6 32a1.58 1.58 0 0 0 1.13-.47l8-8a1.58 1.58 0 0 0 .47-1.13 1.58 1.58 0 0 0-.47-1.13"
        }
      ></path>
    </svg>
  );
}

export default DiamondSquareIcon;
/* prettier-ignore-end */
