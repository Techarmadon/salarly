import z from 'zod/v4'
import type { ParsePayload } from 'zod/v4/core'

export const isValidNumber = (value: string | null | undefined) => {
  const isUndefined = value === undefined
  const isValueNaN = isNaN(Number(value))
  const isEmptyString = value === ''
  const isPositive = Number(value) >= 0

  return isEmptyString || (!isUndefined && !isValueNaN && isPositive)
}

export const isValidPassword = (ctx: ParsePayload<string>) => {
  if (ctx.value.length < 8 || ctx.value.length > 16) {
    ctx.issues.push({
      message: '• Password must be between 8 and 16 characters long.',
      input: ctx.value,
      code: 'length' as 'custom',
    })
  }

  if (!/(?=.*[A-Z]).+/.test(ctx.value)) {
    ctx.issues.push({
      message: '• Password must contain at least one uppercase letter.',
      input: ctx.value,
      code: 'uppercase' as 'custom',
    })
  }

  if (!/(?=.*[a-z]).+/.test(ctx.value)) {
    ctx.issues.push({
      message: '• Password must contain at least one lowercase letter.',
      input: ctx.value,
      code: 'lowercase' as 'custom',
    })
  }

  if (!/(?=.*\d).+/.test(ctx.value)) {
    ctx.issues.push({
      message: '• Password must contain at least one digit.',
      input: ctx.value,
      code: 'digit' as 'custom',
    })
  }
}

export const SignupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: '• Name cannot be empty.' })
    .max(32, { message: '• Name cannot be more than 32 characters.' }),
  email: z.email(),
  password: z.string().check(isValidPassword),
})

export type SignupForm = z.infer<typeof SignupFormSchema>

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
})

export type LoginForm = z.infer<typeof LoginFormSchema>

export type BetterAuthError = {
  code?: string | undefined | undefined
  message?: string | undefined | undefined
  status: number
  statusText: string
} | null
