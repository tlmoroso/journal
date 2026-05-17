import { type HealthPingResponse } from '~/server/health/ping';

interface HealthStatusProps {
  data: HealthPingResponse;
}

export function HealthStatus({ data }: HealthStatusProps) {
  return (
    <p>
      Server status: <strong>{data.status}</strong> (as of{' '}
      <time>{new Date(data.timestamp).toISOString()}</time>)
    </p>
  );
}
