import type { MetadataRoute } from "next";

// Search engines and AI assistants are all welcome: the site is public
// information for people looking for a therapist.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.tiffanyvenegaslcsw.com/sitemap.xml",
    host: "https://www.tiffanyvenegaslcsw.com",
  };
}
