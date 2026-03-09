/* eslint-disable @typescript-eslint/no-explicit-any */

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function MultiJsonLd({ items }: { items: Record<string, any>[] }) {
  return (
    <>
      {items.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
    </>
  );
}
