
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";
import { ActiveTabProvider } from "./context/ActiveTabContext";
import { ThemeProvider } from "next-themes";
import ClientProviders from "@/app/components/ClientProviders";
import { StarknetProvider } from "@/starknetProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StarkField",
  description: "Revolutionizing Agriculture Together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Client-side Providers should wrap everything */}
        <ClientProviders>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
            <ActiveTabProvider>
             
              <StarknetProvider>
                 <Navbar />
                {children}
                </StarknetProvider>
              <Footer />
            </ActiveTabProvider>
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
