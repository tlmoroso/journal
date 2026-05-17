import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <section>
      <h1>Journal</h1>
      <p>Scaffolding alive. tRPC wiring lands in Task 5.</p>
    </section>
  );
}
