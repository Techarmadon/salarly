import { createFileRoute, redirect } from '@tanstack/react-router'
import { getUser } from '@/lib/auth-actions'

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    const user = await getUser()

    if (!user)

      throw redirect({ to: '/auth/login' })

    return { user }

  }
})

