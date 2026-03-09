import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dk Audition",
  description: "Reddit display page",
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
