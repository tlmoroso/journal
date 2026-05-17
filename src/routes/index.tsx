import { createFileRoute } from '@tanstack/react-router';
import { pingHealth } from '~/api/health/ping';
import { HealthStatus } from '~/components/HealthStatus';

export const Route = createFileRoute('/')({
  component: HomePage,
  loader: pingHealth,
});

function HomePage() {
  const data = Route.useLoaderData();
  return (
    <section>
      <h1>Journal</h1>
      <p>Scaffold + TanStack Start health check wired up.</p>
      <HealthStatus data={data} />
    </section>
  );
}
