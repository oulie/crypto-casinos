import MainLayout from '@/components/MainLayout';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import '@/styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import Head from "next/head";
import Link from "next/link";
import React from "react";


export default function MyApp({ Component, pageProps }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [pageScrollProgress, setPageScrollProgress] = React.useState(0);
  const navRef = React.useRef(null);

  const showProgressBar = Component.showProgressBar;

  React.useEffect(() => {
    setPageScrollProgress(0);
  }, [Component]);

  React.useEffect(() => {
    const TOP = 10;

    const compute = () => {
      const el = navRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      setIsScrolled(top <= TOP + 0.5);
    };

    // Run immediately
    compute();
    requestAnimationFrame(compute);
    window.addEventListener("load", compute);
    window.addEventListener("pageshow", compute);

    // Scroll/resize listeners
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("load", compute);
      window.removeEventListener("pageshow", compute);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <PlasmicRootProvider Head={Head} Link={Link}>
      <>
        {/* <TopBar /> */}
        <Navbar
          ref={navRef}
          className="navbar"
          isScrolled={isScrolled}
          progress={showProgressBar ? pageScrollProgress : 0}
          showProgress={showProgressBar}
        />
        <MainLayout
          main={
            <Component
              {...pageProps}
              setPageScrollProgress={setPageScrollProgress}
            />
          }
        />
      </>
    </PlasmicRootProvider>
  );
}
