import * as React from "react";
import { useRouter } from "next/router";
import { PlasmicNavbar } from "./plasmic/cryptocasinos/PlasmicNavbar";
import ModalSearch from "./ModalSearch";

function composeHandlers(...handlers) {
  return (...args) => {
    for (const handler of handlers) {
      if (typeof handler === "function") {
        handler(...args);
      }
    }
  };
}

function Navbar_({ progress = 0, ...props }, ref) {
  const router = useRouter();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isSearchOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isSearchOpen]);

  React.useEffect(() => {
    const closeSearch = () => setIsSearchOpen(false);

    router.events.on("routeChangeStart", closeSearch);
    router.events.on("hashChangeStart", closeSearch);

    return () => {
      router.events.off("routeChangeStart", closeSearch);
      router.events.off("hashChangeStart", closeSearch);
    };
  }, [router.events]);

  return (
    <>
    <PlasmicNavbar navbar={{ ref }} {...props}


      progress={{
        style: {
          width: `${clampedProgress}%`,
          transition: 'width .1s ease',
        }
      }}


      buttonSearch={{
        ...props.buttonSearch,
        onClick: composeHandlers(props.buttonSearch?.onClick, () => {
          setIsSearchOpen(true);
        }),
      }}


    />

    {isSearchOpen ? (
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsSearchOpen(false);
          }
        }}
        style={{
          alignItems: "flex-start",
          backdropFilter: "blur(2px)",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          inset: 0,
          justifyContent: "center",
          padding: "84px 20px 20px",
          position: "fixed",
          zIndex: 1500,
        }}
      >
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
          style={{
            width: "100%",
            maxWidth: "660px",
          }}
        >
          <ModalSearch />
        </div>
      </div>
    ) : null}
    </>
  );
}

const Navbar = React.forwardRef(Navbar_);

export default Navbar;
