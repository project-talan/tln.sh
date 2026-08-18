import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const versionFile = resolve(__dirname, 'version');
const appVersion = existsSync(versionFile) ? readFileSync(versionFile, 'utf-8').trim() : '0.0.0';

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  server: {
    port: 5173,
  },
});
