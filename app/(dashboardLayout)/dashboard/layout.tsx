/* eslint-disable prettier/prettier */
/* eslint-disable react/no-children-prop */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { fontSans } from "@/config/fonts";


import Dashboard from "@/components/Dashboard/Dashboard";
import { Toaster } from "sonner";
import Providers from "@/app/(homeLayout)/providers";

export const metadata: Metadata = {
  title: "Shomik Ujzaman | SEO Expert",
  description:
    "I'm a Creative Content Creator, SEO Specialist, and Visual Storyteller. I blend SEO strategy with visual creativity to help brands stand out in search and social.",
  metadataBase: new URL("https://shomikujzaman.vercel.app"),

};

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div>
            <div className="relative bg-white dark:bg-gray-900 h-full ">
              <Dashboard session={session} children={children} />
            </div>
          </div>
          <Toaster
            richColors
            style={{
              textTransform: "uppercase",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout