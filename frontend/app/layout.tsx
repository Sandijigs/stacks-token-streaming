import type { Metadata } from "next";
import "./globals.css";
import { WalletConnectProvider } from "@/contexts/WalletConnectContext";

export const metadata: Metadata = {
  title: "Token Streaming",
  description: "Stream tokens on Stacks with WalletConnect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletConnectProvider>
          {children}
        </WalletConnectProvider>
      </body>
    </html>
  );
}
