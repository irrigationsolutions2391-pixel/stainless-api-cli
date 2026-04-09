import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "GigFlow Pro | AI-Powered Gig Marketplace for Irrigation & Landscaping Professionals",
  description: "The elite marketplace where irrigation and landscaping professionals connect, earn, and build wealth. AI-powered job matching with 92% success rate, crypto & USD payments, equipment rentals, and viral social networking. Transform your career today.",
  keywords: ["irrigation jobs", "landscaping gigs", "contractor marketplace", "AI job matching", "crypto payments", "equipment rental", "professional networking", "gig economy", "wealth building"],
  authors: [{ name: "Flores Landscape Design LLC", url: "https://gigflowpro.com" }],
  creator: "Hugo Vazquez",
  publisher: "Flores Landscape Design LLC",
  generator: "v0.app",
  applicationName: "GigFlow Pro",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "GigFlow Pro | Where Pros Build Wealth",
    description: "AI-powered gig marketplace with crypto payments, equipment rentals, and 92% job matching success rate.",
    siteName: "GigFlow Pro",
    images: [{ url: "/hero-irrigation-premium.jpg", width: 1200, height: 630, alt: "GigFlow Pro - Professional Irrigation & Landscaping Marketplace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GigFlow Pro | AI-Powered Gig Marketplace",
    description: "Connect. Earn. Build Wealth. The future of irrigation & landscaping gigs is here.",
    images: ["/hero-irrigation-premium.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
