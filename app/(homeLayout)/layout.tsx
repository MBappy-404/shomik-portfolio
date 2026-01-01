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
  title: "Shomik Ujzaman | SEO Expert",
  description:
    "I'm a Creative Content Creator, SEO Specialist, and Visual Storyteller. I blend SEO strategy with visual creativity to help brands stand out in search and social.",
  metadataBase: new URL("https://shomikujzaman.vercel.app"),

};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-english-letter-s-english-icon-image_1157075.jpg"/>
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