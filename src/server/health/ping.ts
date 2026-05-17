import { createServerFn } from '@tanstack/react-start';

export interface HealthPingResponse {
  status: 'ok';
  timestamp: number;
}

export const pingHealth = createServerFn({ method: 'GET' }).handler(async () => {
  console.log('pingHealth');
  return {
    status: 'ok',
    timestamp: Date.now(),
  } satisfies HealthPingResponse;
});
