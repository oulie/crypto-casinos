/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export function FacebookIcon(props) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      aria-hidden={"true"}
      className={classNames(
        "plasmic-default__svg",
        className,
        "plasmic-default__svg plasmic-module__xbqa3a__all PlasmicFooter-module__tqF5fq__svg__l4FlK"
      )}
      focusable={"false"}
      role={"img"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M12 1.715A10.26 10.26 0 0 0 1.714 12c0 5.142 3.772 9.385 8.657 10.157v-7.2H7.757V12h2.614V9.729c0-2.571 1.543-3.986 3.9-3.986 1.115 0 2.315.215 2.315.215v2.528H15.3c-1.286 0-1.671.772-1.671 1.586v1.929h2.87l-.47 2.957h-2.4v7.2c4.885-.772 8.657-5.015 8.657-10.157A10.26 10.26 0 0 0 12 1.715"
        }
      ></path>
    </svg>
  );
}

export default FacebookIcon;
/* prettier-ignore-end */
