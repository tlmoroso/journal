import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to seed the database.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const seedEntries = [
  {
    title: 'First Journal Entry',
    body: 'Seeded entry used for local development and manual smoke tests.',
  },
  {
    title: 'Second Journal Entry',
    body: 'Use pnpm db:test-local to verify migration order and applied state.',
  },
];

async function main() {
  await prisma.journalEntry.deleteMany({});
  await prisma.journalEntry.createMany({
    data: seedEntries,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Seeding failed.', error);
    await prisma.$disconnect();
    process.exit(1);
  });
