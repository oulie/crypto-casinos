/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function LinkedinIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      className={classNames(
        "plasmic-default__svg",
        className,
        "plasmic-default__svg plasmic-module__xbqa3a__all PlasmicFooter-module__tqF5fq__svg__eR03X"
      )}
      data-name={"Isolation Mode"}
      role={"img"}
      viewBox={"0 0 16 16"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M14.82 0H1.18C.53 0 0 .52 0 1.15v13.69C0 15.48.53 16 1.18 16h13.63c.65 0 1.18-.52 1.18-1.15V1.15c0-.64-.53-1.15-1.18-1.15M4.75 13.63H2.38V5.99h2.37zM3.56 4.96a1.375 1.375 0 1 1-.11-2.75h.1c.76.02 1.36.65 1.34 1.41-.02.74-.61 1.33-1.34 1.34m10.08 8.67h-2.37V9.92c0-.88-.02-2.02-1.23-2.02s-1.42.97-1.42 1.96v3.78H6.24V6h2.28v1.04h.03c.32-.6 1.09-1.23 2.24-1.23 2.4 0 2.85 1.58 2.85 3.64v4.19Z"
        }
      ></path>
    </svg>
  );
}

export default LinkedinIcon;
/* prettier-ignore-end */
