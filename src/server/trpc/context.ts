export interface CreateContextOptions {
  headers: Headers;
}

export async function createContext({ headers }: CreateContextOptions) {
  return {
    headers,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
