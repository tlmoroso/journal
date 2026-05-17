import { describe, expect, it } from 'vitest';
import {
  getAppliedMigrationNames,
  getDefinedMigrationNames,
  verifyAppliedMigrationsInOrder,
} from '~/db/migrations';

const itIfDbEnabled = process.env.RUN_DB_TESTS === 'true' ? it : it.skip;

describe('migration verification', () => {
  itIfDbEnabled('ensures applied migrations exactly match local migrations in order', async () => {
    const defined = getDefinedMigrationNames();
    const applied = await getAppliedMigrationNames();

    expect(defined.length).toBeGreaterThan(0);
    expect(applied.length).toBeGreaterThan(0);
    expect(verifyAppliedMigrationsInOrder(defined, applied)).toEqual({
      ok: true,
      message: 'Migrations are applied and ordered correctly.',
    });
  });
});
