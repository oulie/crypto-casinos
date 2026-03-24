import * as React from "react";
import { useRouter } from "next/router";
import { PlasmicNavbarMobile } from "./plasmic/cryptocasinos/PlasmicNavbarMobile";

function normalizePath(path) {
  if (!path) {
    return "/";
  }

  const [pathname] = String(path).split(/[?#]/);

  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function isCurrentPath(currentPath, href) {
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedHref = normalizePath(href);

  if (normalizedHref === "/") {
    return normalizedCurrentPath === "/";
  }

  return (
    normalizedCurrentPath === normalizedHref ||
    normalizedCurrentPath.startsWith(`${normalizedHref}/`)
  );
}

function NavbarMobile_(props, ref) {
  const router = useRouter();
  const currentPath = router.asPath || router.pathname || "/";

  const createLinkProps = React.useCallback(
    ({ href, title }, override) => ({
      href,
      isCurrent: isCurrentPath(currentPath, href),
      title,
      ...override,
    }),
    [currentPath]
  );

  return (
    <PlasmicNavbarMobile
      root={{ ref }}
      {...props}
      linkHome={createLinkProps(
        { href: "/", title: "Home" },
        props.linkHome
      )}
      linkCasinos={createLinkProps(
        { href: "/casinos", title: "Casinos" },
        props.linkCasinos
      )}
      linkGuides={createLinkProps(
        { href: "/guides", title: "Guides" },
        props.linkGuides
      )}
      linkNews={createLinkProps(
        { href: "/news", title: "News" },
        props.linkNews
      )}
      linkCoins={createLinkProps(
        { href: "/coins", title: "Coins" },
        props.linkCoins
      )}
    />
  );
}

const NavbarMobile = React.forwardRef(NavbarMobile_);

export default NavbarMobile;
