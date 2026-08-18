import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const landingDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const rootVersionFile = resolve(landingDir, '..', '..', 'version');
const localVersionFile = resolve(landingDir, 'version');

if (existsSync(rootVersionFile)) {
  copyFileSync(rootVersionFile, localVersionFile);
} else if (!existsSync(localVersionFile)) {
  // Standalone checkout (no repo root in context, e.g. inside a Docker build
  // context that wasn't pre-synced): fall back to a placeholder.
  writeFileSync(localVersionFile, '0.0.0\n');
}
