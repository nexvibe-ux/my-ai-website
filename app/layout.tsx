import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nexvibe AI — Build, deploy & scale intelligent agents",
  description:
    "Nexvibe AI is the platform for shipping production-grade AI agents. Orchestrate models, connect your data, and monitor every run from one dashboard.",
  keywords: ["AI agents", "LLM platform", "AI workflows", "automation", "Nexvibe"],
  openGraph: {
    title: "Nexvibe AI",
    description: "Build, deploy & scale intelligent agents.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0d0f17",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
