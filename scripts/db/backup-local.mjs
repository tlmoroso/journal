import { createWriteStream, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const backupsDirectory = resolve(process.cwd(), 'backups');
mkdirSync(backupsDirectory, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = join(backupsDirectory, `journal-local-${timestamp}.dump`);

const dumpProcess = spawn(
  'docker',
  [
    'compose',
    '-f',
    'docker-compose.local-db.yml',
    'exec',
    '-T',
    'journal-db',
    'pg_dump',
    '-U',
    'journal_user',
    '-d',
    'journal_dev',
    '-Fc',
  ],
  { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'inherit'] },
);

const outputStream = createWriteStream(backupPath);
dumpProcess.stdout.pipe(outputStream);

dumpProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Backup failed with exit code ${code ?? 'unknown'}.`);
    process.exit(code ?? 1);
  }

  console.log(`Database backup written to ${backupPath}`);
});
