import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { serverEnv } from 'env'
import type { User } from 'better-auth'
import type { LoginForm, SignupForm } from './definitions'
import { authClient } from '@/integrations/auth/client'
import { auth } from '@/integrations/auth/server'
import { getRouter } from '@/router'
import { transporter } from '@/integrations/mail/nodemailer'

const from = serverEnv.FROM_AUTH_ALIAS

export async function signupFn(ctx: SignupForm) {
  const router = getRouter()

  const { data, error } = await authClient.signUp.email({
    ...ctx,
  })

  if (data?.user) router.navigate({ to: '/' })

  return error
}

export async function loginFn(ctx: LoginForm) {
  const router = getRouter()
  const { data, error } = await authClient.signIn.email({
    ...ctx,
  })

  if (data?.user) router.navigate({ to: '/' })

  return error
}

export async function logoutFn() {
  const router = getRouter()
  const { error } = await authClient.signOut()

  if (error) return error

  router.navigate({ to: '/auth/login' })
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function sendResetPassword(data: {
  user: User
  url: string
  token: string
}) {
  const {
    user: { email, name },
    url,
  } = data

  void transporter.sendMail({
    from,
    to: email,
    subject: 'Reset your password - Action required',
    text: `Copy the link to your browser to reset your password ${url}`,
  })
}

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()
    const data = await auth.api.getSession({ headers })

    if (!data) {
      return null
    }

    return data.session
  },
)

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const data = await auth.api.getSession({ headers })

  if (!data) {
    return null
  }

  return data.user
})
