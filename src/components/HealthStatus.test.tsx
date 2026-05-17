import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HealthStatus } from './HealthStatus';

vi.mock('~/lib/trpc', () => ({
  useTRPC: () => ({
    health: {
      ping: {
        queryOptions: () => ({
          queryKey: ['health.ping'],
          queryFn: () =>
            Promise.resolve({
              status: 'ok',
              timestamp: 1_700_000_000_000,
            }),
        }),
      },
    },
  }),
}));

function renderWithProviders() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <HealthStatus />
    </QueryClientProvider>,
  );
}

describe('HealthStatus', () => {
  it('renders the server status when the query resolves', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText(/Server status:/i)).toBeInTheDocument();
    });

    expect(screen.getByText('ok')).toBeInTheDocument();
  });
});
