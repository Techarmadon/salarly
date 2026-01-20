import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '@/lib/auth-actions'
import LoginPage from '@/components/auth/login'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
  beforeLoad: async () => {
    const session = await getSession()

    if (session) throw redirect({ to: '/' })
  },
})
