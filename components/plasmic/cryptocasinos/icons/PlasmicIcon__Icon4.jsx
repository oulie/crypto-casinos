/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function Icon4Icon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      data-name={"Layer 1"}
      viewBox={"0 0 99.66 99.66"}
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
          "m86.14 28.72 13.51-13.51L84.45 0 70.94 13.51c-13-7.55-29.21-7.55-42.22 0L15.21 0 0 15.21l13.51 13.51c-7.55 13-7.55 29.21 0 42.22L0 84.45l15.21 15.21 13.51-13.51c6.34 3.7 13.58 5.68 21.12 5.68s14.77-1.98 21.12-5.68l13.51 13.51 15.21-15.21-13.51-13.51c7.55-13 7.55-29.21 0-42.22Zm-50.8 35.61c-7.99-8-7.99-21 0-28.99 4-4 9.24-6 14.49-6s10.5 2 14.5 5.99c7.99 7.99 7.99 20.99 0 28.99-3.87 3.88-9.02 6.01-14.49 6.01s-10.62-2.13-14.49-6Z"
        }
      ></path>
    </svg>
  );
}

export default Icon4Icon;
/* prettier-ignore-end */
