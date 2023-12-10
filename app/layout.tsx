import ClientProvider from "@/components/ClientProvider";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import local from "next/font/local";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import "./globals.css";

/**
 * - Thin
 * - ExtraLight
 * - Light
 * - Regular
 * - Medium
 * - SemiBold
 * - Bold
 * - ExtraBold
 */
const poppinsRegular = local({ src: "../fonts/Poppins-Regular.ttf" });
const description =
	"Una dashboard compatta, sicura e di facile utilizzo per gestire il registro elettronico Argo (didUP)";
const titleFont = local({ src: "../fonts/Poppins-ExtraBold.ttf" });

export const metadata: Metadata = {
	alternates: { canonical: "https://argo-dashboard.vercel.app" },
	applicationName: "Argo Dashboard",
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	description,
	generator: "Next.js",
	icons: "https://argo-dashboard.vercel.app/favicon.ico",
	keywords: ["react", "nextjs", "argo", "registro", "vercel"],
	// TODO: manifest
	metadataBase: new URL("https://argo-dashboard.vercel.app"),
	openGraph: {
		type: "website",
		countryName: "Italy",
		description,
		locale: "it",
		siteName: "Argo Dashboard",
		title: "Argo Dashboard",
		url: "https://argo-dashboard.vercel.app",
		images: "https://argo-dashboard.vercel.app/preview.png",
	},
	publisher: "Vercel",
	title: "Argo Dashboard",
	twitter: {
		card: "summary_large_image",
		description,
		images: "https://argo-dashboard.vercel.app/preview.png",
		creator: "@dtrombett",
		title: "Argo Dashboard",
	},
	verification: { google: "TAmOsVi35BnusH1-Lx2BJLhd3O42orZcSRdGt2QON6A" },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="it">
			<body
				className={`min-h-screen bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white ${poppinsRegular.className}`}
			>
				<main className="flex flex-col min-h-screen p-4 items-center text-center">
					<span className={`m-4 text-4xl ${titleFont.className}`}>
						Argo Dashboard
					</span>
					<div className="h-full w-full flex flex-col flex-auto justify-center items-center">
						<ClientProvider>{children}</ClientProvider>
						<Link
							href="https://github.com/DTrombett/argo-dashboard"
							target="_blank"
							className="mt-4 px-1 text-base"
						>
							<FontAwesomeIcon
								icon={faGithub}
								height={"1rem"}
								className="inline"
							/>{" "}
							Open Source
						</Link>
					</div>
				</main>
			</body>
		</html>
	);
}
