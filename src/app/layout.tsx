

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Youthumb",
  description: "Extract the thumbnail from any youtube video",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
