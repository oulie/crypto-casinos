import * as React from "react";
import { PlasmicBreadcrumbs } from "./plasmic/cryptocasinos/PlasmicBreadcrumbs";
import BreadcrumbChevron from "./BreadcrumbChevron";
import LinkBreadcrumb from "./LinkBreadcrumb";

const uppercaseSegments = new Set(["btc", "eth", "sol", "xrp", "usdt", "usdc"]);

function titleizeSegment(segment) {
  if (!segment) {
    return "";
  }

  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (uppercaseSegments.has(part.toLowerCase())) {
        return part.toUpperCase();
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function getBreadcrumbPath(pageProps, currentPath, pathname) {
  const propPath =
    pageProps?.breadcrumbPath ||
    pageProps?.pageSlug ||
    pageProps?.slug ||
    pageProps?.path;

  if (Array.isArray(propPath)) {
    return `/${propPath.filter(Boolean).join("/")}`;
  }

  if (typeof propPath === "string" && propPath.trim()) {
    return propPath.startsWith("/") ? propPath : `/${propPath}`;
  }

  if (typeof currentPath === "string" && currentPath.trim()) {
    return currentPath;
  }

  return pathname || "/";
}

function buildCrumbs(path) {
  const cleanPath = (path || "/").split("?")[0].split("#")[0];
  const segments = cleanPath.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    return {
      href,
      title: titleizeSegment(segment),
      isCurrent: index === segments.length - 1,
    };
  });
}

function Breadcrumbs_({ pageProps, currentPath, pathname, ...props }, ref) {
  const crumbs = buildCrumbs(getBreadcrumbPath(pageProps, currentPath, pathname));

  return (
    <PlasmicBreadcrumbs
      root={{ ref }}
      {...props}
      links={
        <>
          {crumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 ? <BreadcrumbChevron /> : null}
              <LinkBreadcrumb
                title={crumb.title}
                href={crumb.href}
                isCurrent={crumb.isCurrent}
              />
            </React.Fragment>
          ))}
        </>
      }
    />
  );
}

const Breadcrumbs = React.forwardRef(Breadcrumbs_);

export default Breadcrumbs;
