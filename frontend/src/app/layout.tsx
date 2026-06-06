import type { Metadata } from "next";
import "./globals.css";
import CanvasCursor from "@/components/CanvasCursor";

export const metadata: Metadata = {
  title: "Arun Prasath P | Software Engineer",
  description:
    "Portfolio of Arun Prasath P, a Full-Stack Developer and AI & Machine Learning Enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-primary/30 selection:text-white">
        <CanvasCursor />
        {children}
      </body>
    </html>
  );
}
