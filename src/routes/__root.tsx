import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TRPCProvider } from '~/lib/trpc';
import type { createTrpcClient } from '~/lib/trpc';
import '~/styles.css';

interface RouterContext {
  queryClient: QueryClient;
  trpcClient: ReturnType<typeof createTrpcClient>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { queryClient, trpcClient } = Route.useRouteContext();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Journal</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
            <main>
              <Outlet />
            </main>
            {import.meta.env.DEV ? (
              <>
                <TanStackRouterDevtools position="bottom-right" />
                <ReactQueryDevtools buttonPosition="bottom-left" />
              </>
            ) : null}
          </TRPCProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
