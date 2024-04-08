import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  Content,
  getBuilderSearchParams,
  fetchOneEntry,
} from "@builder.io/sdk-qwik";
import { MEGAMENU_COMPONENTS } from "~/components/builder-registry";

export const useBuilderContent = routeLoader$(
  async ({ url,  params }) => {
   // const isPreviewing = url.searchParams.has("builder.preview");

    const path = `/edit-mega-menu/${params.article}`;
    const builderContent = await fetchOneEntry({
      model: "mega-menu",
      apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
      options: getBuilderSearchParams(url.searchParams),
      //enrich: true,
      userAttributes: {
        urlPath: path,
      },
    });
    //console.log("builderContent", isPreviewing, path, builderContent);
    // If there's no content, throw a 404.
    // You can use your own 404 component here
    // if (!isPreviewing) {
    //   throw error(404, "Page not found");
    // }

    // return content fetched from Builder, which is JSON
    return builderContent;
  },
);

export const Index = component$(() => {
  const builderContent = useBuilderContent();
  //console.log("builderContent", builderContent.value);
  return (
    <Content
      model="mega-menu"
      content={builderContent.value}
      apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
      customComponents={MEGAMENU_COMPONENTS}
    />
  );
});

export default Index;
