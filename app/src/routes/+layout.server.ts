import { db } from "$lib/server/db/index.js";
import { metadata } from "@sc-election/db";

// See `STATIC_BUILD` in `svelte.config.js`.
const staticBuild = process.env.STATIC_BUILD === "true";

export const prerender = staticBuild;

export async function load() {
  const [info] = await db.select().from(metadata).limit(1);

  return {
    lastUpdatedAt: info?.lastFetchedAt?.toISOString() || null,
    // A static host cannot make OG images, because they use query parameters.
    ogImages: !staticBuild,
  };
}
