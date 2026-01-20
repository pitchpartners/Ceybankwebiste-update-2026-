import path from 'path';
import { config } from 'dotenv';
import { auth } from '../src/auth';
import { prisma } from '@repo/database/client';

const envPath =
  process.env.AUTH_ENV_FILE ||
  path.resolve(__dirname, '../../apps/backend/.env');
config({ path: envPath });
config();

const email = process.env.ADMIN_EMAIL || 'admin@ceybank.local';
const password = process.env.ADMIN_PASSWORD || 'Admin123!';
const name = process.env.ADMIN_NAME || 'Ceybank Admin';

async function main() {
  if (!email || !password) {
    throw new Error(
      'ADMIN_EMAIL and ADMIN_PASSWORD are required (set via env or args).',
    );
  }

  // Try to sign up the user (idempotent-ish; will warn if the user exists)
  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
      headers: {},
    });
    console.log(`Created user ${email}`);
  } catch (err) {
    console.warn(
      `signUpEmail warning for ${email}:`,
      (err as Error)?.message || err,
    );
  }

  // Verify login works and print token prefix
  const login = await auth.api.signInEmail({
    body: { email, password, rememberMe: true },
    headers: {},
  });

  const tokenPreview = login.token
    ? `${login.token.slice(0, 16)}...`
    : 'no token (redirect flow)';
  console.log(`Login success for ${email}. Token: ${tokenPreview}`);
}

main()
  .catch((err) => {
    console.error('Admin creation failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
