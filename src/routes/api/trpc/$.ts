import { createFileRoute } from '@tanstack/react-router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '~/server/trpc/routers/_app';
import { createContext } from '~/server/trpc/context';

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => createContext({ headers: request.headers }),
  });
}

export const Route = createFileRoute('/api/trpc/$')({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => handler({ request }),
      POST: ({ request }: { request: Request }) => handler({ request }),
    },
  },
});
