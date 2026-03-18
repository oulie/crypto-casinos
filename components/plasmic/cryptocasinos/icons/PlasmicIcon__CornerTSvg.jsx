/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function CornerTSvgIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      version={"1.1"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M24 0v1.04H0V0z"}></path>

      <path
        fill={"currentColor"}
        d={"m12.466 0 .042 18.78-1.04.002-.042-18.78z"}
      ></path>
    </svg>
  );
}

export default CornerTSvgIcon;
/* prettier-ignore-end */
