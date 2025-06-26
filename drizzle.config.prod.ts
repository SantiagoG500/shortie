import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

const projectDir = process.cwd();
loadEnvConfig(projectDir, false);

export default defineConfig({
  schema: './src/db/db-schemas.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN!,
  },
  verbose: false,
  strict: true, 
});