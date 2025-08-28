import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://tekimax.com",
			images: "https://tekimax.com/og.png",
			siteName: "TEKIMAX",
			...override.openGraph,
		},
		robots: {
			index: true,
			follow: true,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@2enovate",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: "https://tekimax.com/og.png",
			...override.twitter,
		},
		icons: {
			icon: "/favicon.ico",
		},
	};
}

// Use string for baseUrl to avoid URL constructor issues in some environments
export const baseUrl =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: `https://${process.env.VERCEL_URL || "tekimax.com"}`;

// Alternative if URL object is needed:
// export function getBaseUrl(): URL {
//   return new URL(
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3000"
//       : `https://${process.env.VERCEL_URL || "tekimax.com"}`
//   );
// }