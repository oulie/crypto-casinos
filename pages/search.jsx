import React from "react";
import { useRouter } from "next/router";
import { PageParamsProvider as PageParamsProvider__ } from "@plasmicapp/react-web/lib/host";
import { PlasmicQueryDataProvider } from "@plasmicapp/react-web/lib/query";
import GlobalContextsProvider from "../components/plasmic/cryptocasinos/PlasmicGlobalContextsProvider";
import { PlasmicSearchResults } from "../components/plasmic/cryptocasinos/PlasmicSearchResults";

function getSearchTerm(searchParam) {
  if (Array.isArray(searchParam)) {
    return searchParam[0] || "Crypto Casinos";
  }

  if (typeof searchParam === "string" && searchParam.trim()) {
    return searchParam.trim();
  }

  return "Crypto Casinos";
}

function SearchResults() {
  const router = useRouter();
  const searchTerm = getSearchTerm(router.query.s);

  return (
    <GlobalContextsProvider>
      <PlasmicQueryDataProvider>
        <PageParamsProvider__
          params={router.query}
          query={router.query}
          route={router.pathname}
        >
          <PlasmicSearchResults
            searchTerm={{
              children: searchTerm,
            }}
          />
        </PageParamsProvider__>
      </PlasmicQueryDataProvider>
    </GlobalContextsProvider>
  );
}

export default SearchResults;
