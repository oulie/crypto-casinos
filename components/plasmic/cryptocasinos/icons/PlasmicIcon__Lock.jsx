/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function LockIcon(props) {
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
        "lucide lucide-lock-icon lucide-lock"
      )}
      viewBox={"0 0 24 24"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <rect
        width={"18"}
        height={"11"}
        x={"3"}
        y={"11"}
        rx={"2"}
        ry={"2"}
      ></rect>

      <path d={"M7 11V7a5 5 0 0 1 10 0v4"}></path>
    </svg>
  );
}

export default LockIcon;
/* prettier-ignore-end */
