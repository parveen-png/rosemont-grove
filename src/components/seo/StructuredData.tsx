export function StructuredData({ data }: { data: unknown | unknown[] }) {
  const graph = Array.isArray(data) ? data : [data];

  return (
    <>
      {graph.map((item, index) => (
        <script
          // Structured data must be serialized exactly once per object
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
