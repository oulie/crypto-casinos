/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function IconBitcoinIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      data-name={"Isolation Mode"}
      viewBox={"0 0 70.98 94.08"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M70.8 38.16c1.44-10.32-6-15.36-16.32-18.96L57.84 6l-8.16-2.16-3.12 12.96-6.72-1.68L43.2 2.16 34.8 0l-3.12 13.44-5.28-1.2-11.28-2.88L13.2 18l5.76 1.44c3.36.96 4.08 3.36 3.6 5.04l-3.6 15.12.72.24-.72-.24-5.28 21.36c-.48 1.2-1.44 2.64-3.84 1.92l-5.76-1.44L0 70.8l16.32 4.08-3.12 13.68 7.92 1.92 3.36-13.2 6.24 1.44-3.12 13.2 8.16 2.16 3.36-13.44c13.92 2.64 24.48 1.44 28.8-11.04 3.36-10.08-.24-15.84-7.68-19.68 5.28-1.2 9.36-4.8 10.56-11.76M52.32 64.08c-2.64 9.84-19.68 4.8-25.2 3.36l4.56-18c5.52 1.44 23.28 4.08 20.64 14.64m2.16-26.4c-2.16 9.36-16.08 4.8-20.88 3.6l4.08-16.32c4.8 1.2 19.44 3.36 16.8 12.72"
        }
      ></path>
    </svg>
  );
}

export default IconBitcoinIcon;
/* prettier-ignore-end */
