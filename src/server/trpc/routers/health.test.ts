import { describe, expect, it } from 'vitest';
import { createCallerFactory } from '~/server/trpc/trpc';
import { appRouter } from '~/server/trpc/routers/_app';

describe('health router', () => {
  it('ping returns ok with a server timestamp', async () => {
    const createCaller = createCallerFactory(appRouter);
    const caller = createCaller({ headers: new Headers() });

    const result = await caller.health.ping();

    expect(result.status).toBe('ok');
    expect(typeof result.timestamp).toBe('number');
    expect(result.timestamp).toBeGreaterThan(0);
  });
});
