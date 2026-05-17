import { createFileRoute } from '@tanstack/react-router';
import { HealthStatus } from '~/components/HealthStatus';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <section>
      <h1>Journal</h1>
      <p>Scaffold + tRPC wired up.</p>
      <HealthStatus />
    </section>
  );
}
