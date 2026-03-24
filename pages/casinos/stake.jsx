import React, { useRef, useEffect, useState } from "react";
import { PageParamsProvider as PageParamsProvider__ } from "@plasmicapp/react-web/lib/host";
import GlobalContextsProvider from "../../components/plasmic/cryptocasinos/PlasmicGlobalContextsProvider";
import { PlasmicReviewSample } from "../../components/plasmic/cryptocasinos/PlasmicReviewSample";
import { useRouter } from "next/router";
import { PlasmicQueryDataProvider } from "@plasmicapp/react-web/lib/query";

function ReviewSample({ setPageScrollProgress }) {
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const element = contentRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const maxScroll = Math.max(element.offsetHeight - window.innerHeight, 0);

      if (maxScroll === 0) {
        setProgress(100);
        setPageScrollProgress?.(100);
        return;
      }

      const nextProgress =
        (Math.min(Math.max(-rect.top, 0), maxScroll) / maxScroll) * 100;

      setProgress(nextProgress);
      setPageScrollProgress?.(nextProgress);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    scheduleUpdate();
    window.addEventListener("load", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });

    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleUpdate);

    if (observer && contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("load", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      observer?.disconnect();
      setPageScrollProgress?.(0);
    };
  }, [setPageScrollProgress]);

  return (
    <GlobalContextsProvider>
      <PlasmicQueryDataProvider>
        <PageParamsProvider__
          route={useRouter()?.pathname}
          params={useRouter()?.query}
          query={useRouter()?.query}
        >
          <PlasmicReviewSample

            sidebarTableOfContents={{
              progress
            }}

            leftContent={{
              ref: contentRef,
            }}



          />
        </PageParamsProvider__>
      </PlasmicQueryDataProvider>
    </GlobalContextsProvider>
  );
}

ReviewSample.showProgressBar = true;
export default ReviewSample;
