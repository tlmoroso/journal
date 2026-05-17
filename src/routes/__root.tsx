import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { RouteError } from '~/components/boundaries/RouteError';
import { RouteNotFound } from '~/components/boundaries/RouteNotFound';
import { RoutePending } from '~/components/boundaries/RoutePending';
import '~/styles.css';

export const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: RoutePending,
  errorComponent: ({ error }) => <RouteError error={error} />,
  notFoundComponent: RouteNotFound,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Journal</title>
      </head>
      <body>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right"  initialIsOpen={true} />
      </body>
    </html>
  );
}
