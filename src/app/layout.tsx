import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { Metadata } from "next";
import {TailwindIndicator} from "@/components/tailwind-indicator";
import { ThemeProvider } from "next-themes";
import { Style } from "@/components/Style";
import SiteHeader from "@/components/SiteHeader";
const inter = Source_Sans_3({ subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Cloud Dashboard",
    description: "Live Cloud Dashboard",
    icons: {
        icon: "/getProductLogo.json",
    },
};

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            themes={["blue", "dark", "light", "grey"]}
            attribute='class'
            defaultTheme='light'
            enableSystem
            storageKey='theme'
            disableTransitionOnChange
        >
            <SiteHeader/>
            <Style>{children}</Style>

            <TailwindIndicator />
        </ThemeProvider>

        </body>
        </html>
    );
}
