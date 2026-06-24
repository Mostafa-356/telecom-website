'use client'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'TelecomHub',
    'url': 'https://telecom-website7.netlify.app',
    'logo': 'https://telecom-website7.netlify.app/logo.svg',
    'description': 'Premium 5G mobile services and telecom solutions',
    'contact': {
      '@type': 'ContactPoint',
      'contactType': 'Customer Support',
      'telephone': '+1-800-TELECOM',
      'email': 'support@telecom-website7.netlify.app'
    },
    'sameAs': [
      'https://facebook.com',
      'https://twitter.com',
      'https://instagram.com'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'TelecomHub',
    'image': 'https://telecom-website7.netlify.app/logo.svg',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Technology Park',
      'addressLocality': 'Silicon Valley',
      'addressRegion': 'CA',
      'postalCode': '94025',
      'addressCountry': 'US'
    },
    'telephone': '+1-800-TELECOM',
    'priceRange': '$$'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  )
}
