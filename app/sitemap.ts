import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindcolor.wiaderek.cloud";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			changeFrequency: "monthly",
			priority: 1,
			url: siteUrl,
		},
	];
}
