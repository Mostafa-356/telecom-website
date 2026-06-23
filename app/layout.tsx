import type { Metadata, Viewport } from 'next'
import './globals.css'

// Viewport configuration (Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0066ff',
}

export const metadata: Metadata = {
  title: 'Telecom Website | Premium 5G Mobile Services & Plans',
  description: 'Discover premium telecom services with ultra-fast 5G connectivity, unlimited plans, and exceptional customer support. Join thousands of satisfied customers today.',
  generator: 'Next.js',
  keywords: ['telecom', '5G', 'mobile services', 'unlimited plans', 'connectivity', 'phone plans'],
  authors: [{ name: 'Telecom Website Team' }],
  creator: 'Telecom Website',
  publisher: 'Telecom Website',
  
  // Open Graph Meta Tags
  openGraph: {
    type: 'website',
    url: 'https://yourdomain.com',
    title: 'Telecom Website | Premium 5G Mobile Services & Plans',
    description: 'Discover premium telecom services with ultra-fast 5G connectivity, unlimited plans, and exceptional customer support.',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Telecom Website - Premium Mobile Services',
        type: 'image/jpeg',
      },
    ],
    siteName: 'Telecom Website',
    locale: 'en_US',
  },
  
  // Twitter Meta Tags
  twitter: {
    card: 'summary_large_image',
    site: '@telecomwebsite',
    creator: '@telecomwebsite',
    title: 'Telecom Website | Premium 5G Mobile Services',
    description: 'Ultra-fast 5G connectivity, unlimited plans, and exceptional customer support.',
    images: ['https://yourdomain.com/twitter-image.jpg'],
  },
  
  // Additional Meta Tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://yourdomain.com',
  },
  
  // Icons
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  
  // Manifest & Theme
  manifest: '/manifest.json',
  
  // Additional SEO
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Mobile & Theme */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TelecomHub" />
        <meta name="theme-color" content="#0066ff" />
        
        {/* Additional SEO */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
