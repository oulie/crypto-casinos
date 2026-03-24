import * as React from "react";
import { PageParamsProvider as PageParamsProvider__ } from "@plasmicapp/react-web/lib/host";
import GlobalContextsProvider from "../components/plasmic/cryptocasinos/PlasmicGlobalContextsProvider";
import { PlasmicHomepage } from "../components/plasmic/cryptocasinos/PlasmicHomepage";
import { useRouter } from "next/router";
import { PlasmicQueryDataProvider } from "@plasmicapp/react-web/lib/query";

function Homepage() {

  return (
    <GlobalContextsProvider>
      <PlasmicQueryDataProvider>
        <PageParamsProvider__
          route={useRouter()?.pathname}
          params={useRouter()?.query}
          query={useRouter()?.query}
        >
          <PlasmicHomepage


       

          />
        </PageParamsProvider__>
      </PlasmicQueryDataProvider>
    </GlobalContextsProvider>
  );
}

export default Homepage;
