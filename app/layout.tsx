import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IrrigGig AI - Connect, Hire, Get Paid",
  description: "AI-powered marketplace for irrigation professionals. Find top talent or land your next gig.",
  generator: "v0.app",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://stainless-api-cli.vercel.app"),
  openGraph: {
    title: "IrrigGig AI - Connect, Hire, Get Paid",
    description: "AI-powered marketplace for irrigation professionals. Find top talent or land your next gig.",
    url: "https://stainless-api-cli.vercel.app",
    siteName: "IrrigGig AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IrrigGig AI",
    description: "AI-powered marketplace for irrigation professionals.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
