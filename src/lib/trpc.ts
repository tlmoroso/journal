import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '~/server/trpc/routers/_app';

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export function createTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  });
}
