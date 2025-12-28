interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * JsonLd - Renders JSON-LD structured data for SEO and AI understanding
 *
 * @example
 * <JsonLd data={getOrganizationSchema()} />
 * <JsonLd data={[getOrganizationSchema(), getWebApplicationSchema()]} />
 */
export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  )
}
