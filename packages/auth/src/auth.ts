import { betterAuth } from 'better-auth';
import { prisma } from "@repo/database/client"
import { jwt } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: { 
    enabled: true,
    autoSignIn: true,
  },
  basePath: "/api/auth",
  trustedOrigins: process.env.CROSS_ORIGINS?.split(',') || [],
  plugins: [
    jwt(),
  ],
});
