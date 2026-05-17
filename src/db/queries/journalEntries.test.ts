import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { JournalEntry } from '~/db/queries/journalEntries';
import {
  createJournalEntry,
  getJournalEntryById,
  listJournalEntries,
} from '~/db/queries/journalEntries';
import { getDb } from '~/db/client';

vi.mock('~/db/client', () => ({
  getDb: vi.fn(),
}));

const getDbMock = vi.mocked(getDb);

const findManyMock = vi.fn();
const findUniqueMock = vi.fn();
const createMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  getDbMock.mockReturnValue({
    journalEntry: {
      findMany: findManyMock,
      findUnique: findUniqueMock,
      create: createMock,
    },
  } as unknown as ReturnType<typeof getDb>);
});

describe('journal entry query wrappers', () => {
  it('returns entries from the database ordered newest first', async () => {
    const expected: JournalEntry[] = [
      {
        id: 2,
        title: 'Second',
        body: 'Second entry',
        createdAt: new Date('2026-05-02T00:00:00.000Z'),
        updatedAt: new Date('2026-05-02T00:00:00.000Z'),
      },
    ];
    findManyMock.mockResolvedValue(expected);

    const result = await listJournalEntries();

    expect(findManyMock).toHaveBeenCalledWith({
      orderBy: {
        createdAt: 'desc',
      },
    });
    expect(result).toEqual(expected);
  });

  it('returns null when an entry id does not exist', async () => {
    findUniqueMock.mockResolvedValue(null);

    const result = await getJournalEntryById(999);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: {
        id: 999,
      },
    });
    expect(result).toBeNull();
  });

  it('creates and returns a journal entry', async () => {
    const created: JournalEntry = {
      id: 3,
      title: 'Created',
      body: 'Created entry',
      createdAt: new Date('2026-05-03T00:00:00.000Z'),
      updatedAt: new Date('2026-05-03T00:00:00.000Z'),
    };
    createMock.mockResolvedValue(created);

    const result = await createJournalEntry({
      title: 'Created',
      body: 'Created entry',
    });

    expect(createMock).toHaveBeenCalledWith({
      data: {
        title: 'Created',
        body: 'Created entry',
      },
    });
    expect(result).toEqual(created);
  });
});
