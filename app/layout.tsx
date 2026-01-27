import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nirushmanshrestha.com.np"),
  title: "Nirush Man Shrestha | Software Engineer",
  description:
    "Portfolio of Nirush Man Shrestha - Software Engineer specializing in backend development, web technologies, and user-centered design.",
  authors: [{ name: "Nirush Man Shrestha" }],
  openGraph: {
    type: "website",
    url: "https://nirushmanshrestha.com.np/",
    title: "Nirush Man Shrestha | Software Engineer",
    description: "Passionate developer creating amazing digital experiences.",
    images: ["/profile/profile1.JPG"],
  },
  icons: {
    icon: "/profile/profile.JPG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
