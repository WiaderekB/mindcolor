/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindcolor.wiaderek.cloud";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "mindcolor® - kompetencje mentalne poprzez doświadczenie",
		template: "%s | mindcolor®",
	},
	description: "Praktyczny system rozwijania koncentracji, spokoju, kreatywności i energii u dzieci i młodzieży.",
	alternates: {
		canonical: "/",
	},
	icons: {
		icon: "/images/mindcolor-logo.jpg",
		shortcut: "/images/mindcolor-logo.jpg",
		apple: "/images/mindcolor-logo.jpg",
	},
	openGraph: {
		type: "website",
		locale: "pl_PL",
		url: "/",
		title: "mindcolor® - rozwój, którego można doświadczyć",
		description: "Cztery stany mentalne. Prosty język. Praktyczne narzędzia dla dzieci, rodziców, trenerów i specjalistów.",
		images: [
			{
				url: "/og.png",
				width: 1730,
				height: 909,
				alt: "mindcolor® - Pozwól mu tego doświadczyć.",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "mindcolor® - rozwój, którego można doświadczyć",
		description: "Cztery stany mentalne. Prosty język. Praktyczne narzędzia.",
		images: ["/og.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pl">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
			</head>
			<body>{children}</body>
		</html>
	);
}
