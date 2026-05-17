export function RouteError({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : 'Unknown error';

  return (
    <section role="alert">
      <h1>Something went wrong</h1>
      <p>{message}</p>
    </section>
  );
}
