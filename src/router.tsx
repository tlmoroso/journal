import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { createQueryClient } from '~/lib/query-client';
import { createTrpcClient } from '~/lib/trpc';

export function getRouter() {
  const queryClient = createQueryClient();
  const trpcClient = createTrpcClient();

  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: { queryClient, trpcClient },
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
