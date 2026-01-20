import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const clientEnv = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_AUTH_URL: z.url(),
  },

  runtimeEnv: import.meta.env,
})

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),

    SMTP_HOST: z.string(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),

    FROM_AUTH_ALIAS: z.string(),
  },

  runtimeEnv: process.env,
})
