import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@salarly/database'
import { expo } from '@better-auth/expo'
import { sendResetPassword } from '@/lib/auth-actions'

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async (data) => sendResetPassword({ data }),
  },
  plugins: [
    expo(),
    // should always be the last plugin
    tanstackStartCookies(),
  ],
  trustedOrigins: (process.env.BETTER_AUTH_URL ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
})
