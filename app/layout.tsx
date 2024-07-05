import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./AppProvider";

// Import the Inter font from Google Fonts with the Latin subset
const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the app
 */
export const metadata: Metadata = {
  title: "ABC Health System",
  description: "Payment portal for ABC Health System powered by Cedar",
};

/**
 * RootLayout component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 *
 * @returns {JSX.Element} The root layout component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
