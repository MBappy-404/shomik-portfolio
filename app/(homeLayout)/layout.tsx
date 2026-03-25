import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { fontSans } from "@/config/fonts";

import { Toaster } from "sonner";
import Providers from "./providers";
import NavBar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  metadataBase: new URL("https://shomikujzaman.vercel.app"),

  // Updated Title
  title: "Social Media Strategist | Content Strategist | SEO Specialist",

  // Updated Description to focus on you personally
  description:
    "Shomik Ujzaman is an SEO Specialist and Creative Content Strategist focused on search visibility, digital growth, and visual storytelling.",

  keywords: [
    "Shomik Ujzaman",
    "shomikujzaman",
    "SEO Specialist",
    "Crazy Artist Studio",
    "crazyshomik",
    "Shomik Ujzaman (@crazyshomik)",
    "SEO Expert",
    "Content Creator",
    "Content Strategist",
    "Search Engine Optimization",
    "Technical SEO",
    "Digital Marketing Specialist",
  ],

  alternates: {
    canonical: "https://shomikujzaman.vercel.app",
  },

  openGraph: {
    title: "Social Media Strategist | Content Strategist | SEO Specialist",
    description:
      "Official portfolio of Shomik Ujzaman. SEO-focused content creator helping brands improve visibility through clean strategy.",
    url: "https://shomikujzaman.vercel.app",
    siteName: "Shomik Ujzaman",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shomik Ujzaman",
      },
    ],
    type: "profile",
  },

  twitter: {
    card: "summary_large_image",
    title: "Social Media Strategist | Content Strategist | SEO Specialist",
    description:
      "SEO Specialist and Creative Content Creator focused on search growth.",
    images: ["/og-image.png"],
  },
};


const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div>
            <NavBar />
            <main className="min-h-screen    dark:bg-gray-950">
              {children}
              <ScrollProgress />
            </main>
          </div>
          <Toaster
            richColors
            style={{
              textTransform: "uppercase",
            }}
          />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;