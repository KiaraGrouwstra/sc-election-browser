import adapterNode from "@sveltejs/adapter-node";
import adapterStatic from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// Set `STATIC_BUILD=true` to prerender the site for a static host, such as GitHub Pages.
// The build then reads the data from `DATABASE_URL` one time.
const staticBuild = process.env.STATIC_BUILD === "true";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: staticBuild
      ? adapterStatic({ fallback: "404.html" })
      : adapterNode(),
    paths: {
      base: process.env.BASE_PATH ?? "",
    },
    prerender: {
      origin: process.env.PRERENDER_ORIGIN ?? "http://sveltekit-prerender",
    },
  },
};

export default config;
