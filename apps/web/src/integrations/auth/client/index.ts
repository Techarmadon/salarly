import { createAuthClient } from 'better-auth/react'
import { clientEnv } from 'env'
import { must } from '@/lib/must'

const baseURL = must(
  clientEnv.VITE_AUTH_URL,
  'Missing VITE_AUTH_URL env variable',
)

export const authClient = createAuthClient({
  baseURL,
  plugins: [],
})
