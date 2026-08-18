import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const versionFile = fileURLToPath(new URL('./version', import.meta.url));
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
