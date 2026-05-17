import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { getDb } from '~/db/client';

const MIGRATIONS_DIR = resolve(process.cwd(), 'prisma/migrations');
const MIGRATION_DIRECTORY_PATTERN = /^\d{14}_[a-z0-9_]+$/;

export function getDefinedMigrationNames(): string[] {
  return readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => MIGRATION_DIRECTORY_PATTERN.test(name))
    .sort((a, b) => a.localeCompare(b));
}

export async function getAppliedMigrationNames(): Promise<string[]> {
  const rows = await getDb().$queryRaw<Array<{ migration_name: string }>>`
    SELECT migration_name
    FROM "_prisma_migrations"
    WHERE finished_at IS NOT NULL
      AND rolled_back_at IS NULL
    ORDER BY finished_at ASC, migration_name ASC
  `;

  return rows.map((row) => row.migration_name);
}

export function verifyAppliedMigrationsInOrder(
  definedMigrationNames: string[],
  appliedMigrationNames: string[],
): { ok: boolean; message: string } {
  if (definedMigrationNames.length !== appliedMigrationNames.length) {
    return {
      ok: false,
      message: `Defined migrations (${definedMigrationNames.length}) do not match applied migrations (${appliedMigrationNames.length}).`,
    };
  }

  for (let index = 0; index < definedMigrationNames.length; index += 1) {
    if (definedMigrationNames[index] !== appliedMigrationNames[index]) {
      return {
        ok: false,
        message: `Migration mismatch at index ${index}: expected "${definedMigrationNames[index]}", received "${appliedMigrationNames[index]}".`,
      };
    }
  }

  return {
    ok: true,
    message: 'Migrations are applied and ordered correctly.',
  };
}
