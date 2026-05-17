import type { JournalEntry as PrismaJournalEntry } from '@prisma/client';
import { getDb } from '~/db/client';

export type JournalEntry = PrismaJournalEntry;

export interface CreateJournalEntryInput {
  title: string;
  body: string;
}

export async function listJournalEntries(): Promise<JournalEntry[]> {
  return getDb().journalEntry.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getJournalEntryById(id: number): Promise<JournalEntry> {
  return getDb().journalEntry.findUniqueOrThrow({
    where: {
      id,
    },
  });
}

export async function createJournalEntry(input: CreateJournalEntryInput): Promise<JournalEntry> {
  return getDb().journalEntry.create({
    data: {
      title: input.title,
      body: input.body,
    },
  });
}
