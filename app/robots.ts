import type { MetadataRoute } from "next";

// Student project: keep the site out of search engines so nobody mistakes it for the real restaurant.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
