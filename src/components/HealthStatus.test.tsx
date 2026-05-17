import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HealthStatus } from './HealthStatus';
import type { HealthPingResponse } from '~/server/health/ping';

const pingHealthMock = vi.fn<() => Promise<HealthPingResponse>>().mockResolvedValue({
  status: 'ok',
  timestamp: 1_700_000_000_000,
});

vi.mock('@tanstack/react-start', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-start')>();
  return {
    ...actual,
    useServerFn: () => pingHealthMock,
  };
});

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
    expect(pingHealthMock).toHaveBeenCalledTimes(1);
  });
});
