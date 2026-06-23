/**
 * JSON-LD Schema Component
 * Add structured data for better SEO and rich snippets
 */

import React from 'react'

interface SchemaProps {
  schema: Record<string, unknown>
}

export const Schema: React.FC<SchemaProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
      suppressHydrationWarning
    />
  )
}

// Organization schema component
export const OrganizationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Telecom Website",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo.png",
    "description": "Leading telecom provider offering premium 5G mobile services",
    "contact": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "support@yourdomain.com"
    }
  }

  return <Schema schema={schema} />
}

// Local business schema component
export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Telecom Website",
    "image": "https://yourdomain.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "telephone": "+1-XXX-XXX-XXXX"
  }

  return <Schema schema={schema} />
}

// Breadcrumb schema component
export const BreadcrumbSchema: React.FC<{ items: Array<{ name: string; url: string }> }> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return <Schema schema={schema} />
}

// FAQ schema component
export const FAQSchema: React.FC<{ items: Array<{ question: string; answer: string }> }> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return <Schema schema={schema} />
}

// Product schema component
export const ProductSchema: React.FC<{
  name: string
  description: string
  image: string
  price: string
  currency: string
  rating?: number
  ratingCount?: number
}> = ({ name, description, image, price, currency, rating, ratingCount }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": "Telecom Website"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": currency,
      "price": price
    },
    ...(rating && ratingCount && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating.toString(),
        "ratingCount": ratingCount.toString()
      }
    })
  }

  return <Schema schema={schema} />
}
