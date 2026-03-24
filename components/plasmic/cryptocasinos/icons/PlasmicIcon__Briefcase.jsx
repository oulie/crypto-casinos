/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function BriefcaseIcon(props) {
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
        "lucide lucide-briefcase-icon lucide-briefcase"
      )}
      viewBox={"0 0 24 24"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path d={"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}></path>

      <rect width={"20"} height={"14"} x={"2"} y={"6"} rx={"2"}></rect>
    </svg>
  );
}

export default BriefcaseIcon;
/* prettier-ignore-end */
