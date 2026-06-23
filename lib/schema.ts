/**
 * Schema.org JSON-LD structured data generators
 * These help search engines understand your content better
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Telecom Website",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/logo.png",
  "description": "Leading telecom provider offering premium 5G mobile services and unlimited plans",
  "email": "support@yourdomain.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://facebook.com/yourpage",
    "https://twitter.com/yourhandle",
    "https://linkedin.com/company/yourcompany",
    "https://instagram.com/yourhandle"
  ],
  "contact": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "telephone": "+1-XXX-XXX-XXXX",
    "email": "support@yourdomain.com"
  }
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Telecom Website",
  "image": "https://yourdomain.com/logo.png",
  "description": "Premium telecom services with 5G connectivity",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": "+1-XXX-XXX-XXXX",
  "priceRange": "$$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": 500
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": "John Doe"
      },
      "reviewBody": "Excellent service and great coverage!"
    }
  ]
}

export const mobileApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Telecom Website App",
  "operatingSystem": "iOS, Android, Web",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "Free",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250"
  }
}

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourdomain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Plans",
      "item": "https://yourdomain.com/plans"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "5G Unlimited",
      "item": "https://yourdomain.com/plans/5g-unlimited"
    }
  ]
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What 5G plans do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer various 5G plans from $49/month with unlimited data..."
      }
    },
    {
      "@type": "Question",
      "name": "How do I switch providers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Switching is easy! Our support team will help you transfer your number..."
      }
    }
  ]
}

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "5G Unlimited Plan",
  "description": "Premium unlimited 5G data plan with unlimited calls and texts",
  "image": "https://yourdomain.com/product-image.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Telecom Website"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://yourdomain.com/plans/5g-unlimited",
    "priceCurrency": "USD",
    "price": "49.99",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Telecom Website"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "ratingCount": "312"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Jane Smith"
      },
      "reviewBody": "Best plan I've ever used!"
    }
  ]
}

// Helper function to create script tag for JSON-LD
export const schemaToScript = (schema: Record<string, unknown>) => {
  return {
    __html: JSON.stringify(schema)
  }
}
