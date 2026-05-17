import { router } from '~/server/trpc/trpc';
import { healthRouter } from '~/server/trpc/routers/health';

export const appRouter = router({
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
