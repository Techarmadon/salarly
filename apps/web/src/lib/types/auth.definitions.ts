import z from 'zod/v4'
import { isValidPassword } from '../utils'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: '• Name cannot be empty.' })
    .max(32, { message: '• Name cannot be more than 32 characters.' }),
  email: z.email({ error: '• Invalid email.' }),
  password: z.string().check(isValidPassword),
})

export type SignupForm = z.infer<typeof SignupFormSchema>

export const LoginFormSchema = z.object({
  email: z.email({ error: '• Invalid email.' }),
  password: z.string().nonempty({ error: '• Password cannot be empty.' }),
})

export type LoginForm = z.infer<typeof LoginFormSchema>

export const ResetPasswordFormSchema = z.object({
  email: z.email({ error: '• Invalid email.' }),
})

export type ResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>

// We need to find a better home for this type
export type BetterAuthError = {
  code?: string | undefined | undefined
  message?: string | undefined | undefined
  status: number
  statusText: string
} | null
