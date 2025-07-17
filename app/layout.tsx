import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { AuthProvider } from "@/context/auth/AuthContext";
import { CourseProvider } from "@/context/course/CourseContext";

export const metadata: Metadata = {
  title: "Aman Tailors - Learn Professional Stitching in Punjabi Online",
  description: "Aman Tailors offers comprehensive online courses for learning professional stitching in Punjabi, accessible to students worldwide.",
  keywords: ["stitching course", "Punjabi stitching", "online tailoring", "fashion design", "learn sewing", "Punjabi fashion", "dressmaking", "online courses", "stitching classes", "global learning", "vocational training"],
  authors: [{ name: "Aman Tailors", url: "https://amantailor4088.com" }],
  creator: "Aman Tailors",
  publisher: "Aman Tailors",
  applicationName: "Aman Tailors Platform",
  generator: "Next.js",

  metadataBase: new URL("https://amantailor4088.com"),

  openGraph: {
    title: "Aman Tailors - Learn Professional Stitching in Punjabi",
    description: "Master the art of stitching with Aman Tailors' online courses, taught in Punjabi for learners across the globe. Start your journey in fashion design today!",
    url: "https://amantailor4088.com",
    siteName: "Aman Tailors",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aman Tailors Logo",
      },
    ],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://amantailor4088.com",
  },
  other: {
    "theme-color": "#0a0a0a",
    "msapplication-TileColor": "#0a0a0a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Aman Tailors - Learn Professional Stitching in Punjabi Online</title>
        <meta name="keywords" content="stitching course, Punjabi stitching, online tailoring, fashion design, learn sewing, Punjabi fashion, dressmaking, online courses, stitching classes, global learning, vocational training" />
        <meta name="author" content="Aman Tailors" />
        <meta name="description" content="Aman Tailors offers comprehensive online courses for learning professional stitching in Punjabi, accessible to students worldwide." />

        <meta property="og:title" content="Aman Tailors - Help you learn professional stitching in Punjabi" />
        <meta property="og:description" content="Master the art of stitching with Aman Tailors' online courses, taught in Punjabi for learners across the globe. Start your journey in fashion design today!" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://amantailor4088.com" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`antialiased`}>
        <AuthProvider>
          <CourseProvider>
            <Navbar />
            {children}
            <Footer />
          </CourseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
