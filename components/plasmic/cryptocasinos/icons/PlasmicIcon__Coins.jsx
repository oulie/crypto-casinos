/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function CoinsIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      strokeWidth={"2"}
      className={classNames(
        "plasmic-default__svg",
        className,
        "lucide lucide-coins-icon lucide-coins"
      )}
      viewBox={"0 0 24 24"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path d={"M13.744 17.736a6 6 0 1 1-7.48-7.48M15 6h1v4"}></path>

      <path d={"m6.134 14.768.866-.5 2 3.464"}></path>

      <circle cx={"16"} cy={"8"} r={"6"}></circle>
    </svg>
  );
}

export default CoinsIcon;
/* prettier-ignore-end */
