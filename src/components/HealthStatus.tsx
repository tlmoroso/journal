import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '~/lib/trpc';

export function HealthStatus() {
  const trpc = useTRPC();
  const { data, isLoading, error } = useQuery(trpc.health.ping.queryOptions());

  if (isLoading) return <p>Checking server...</p>;
  if (error) return <p style={{ color: 'crimson' }}>Server error: {error.message}</p>;
  if (!data) return null;

  return (
    <p>
      Server status: <strong>{data.status}</strong> (as of{' '}
      <time>{new Date(data.timestamp).toISOString()}</time>)
    </p>
  );
}
