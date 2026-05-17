import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

declare global {
  var __journalDbClient: PrismaClient | undefined;
}

function createDbClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is required to create a Prisma client.');
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export function getDb(): PrismaClient {
  if (!globalThis.__journalDbClient) {
    globalThis.__journalDbClient = createDbClient();
  }

  return globalThis.__journalDbClient;
}
