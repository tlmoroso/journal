import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '~/styles.css';

export const Route = createRootRoute({
  component: RootComponent,
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
        <main>
          <Outlet />
        </main>
        {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
      </body>
    </html>
  );
}
