import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@salarly/database'
import { sendResetPassword } from '@/lib/auth-actions'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async (data) => sendResetPassword({ data }),
  },
  plugins: [
    // should always be the last plugin
    tanstackStartCookies(),
  ],
})
