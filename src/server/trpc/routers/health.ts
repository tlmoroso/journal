import { publicProcedure, router } from '~/server/trpc/trpc';

export const healthRouter = router({
  ping: publicProcedure.query(() => ({
    status: 'ok' as const,
    timestamp: Date.now(),
  })),
});
