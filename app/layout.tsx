import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0E5D8" },
    { media: "(prefers-color-scheme: dark)", color: "#2E4052" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nirushmanshrestha.com.np"),
  title: "Nirush Man Shrestha | Software Engineer",
  description:
    "Portfolio of Nirush Man Shrestha - Software Engineer specializing in backend development, web technologies, and user-centered design.",
  authors: [{ name: "Nirush Man Shrestha" }],
  keywords: ["Software Engineer", "Developer", "Backend Development", "Web Development", "Portfolio"],
  openGraph: {
    type: "website",
    url: "https://nirushmanshrestha.com.np/",
    title: "Nirush Man Shrestha | Software Engineer",
    description: "Passionate developer creating amazing digital experiences.",
    images: ["/profile/profile1.JPG"],
    siteName: "Nirush Man Shrestha Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirush Man Shrestha | Software Engineer",
    description: "Passionate developer creating amazing digital experiences.",
    images: ["/profile/profile1.JPG"],
  },
  icons: {
    icon: "/profile/profile.JPG",
    apple: "/profile/profile.JPG",
  },
  robots: {
    index: true,
    follow: true,
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
