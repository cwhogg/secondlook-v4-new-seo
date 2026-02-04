interface JsonLdProps {
  schema: string
  data: Record<string, any>
}

export default function JsonLd({ schema, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...data
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}