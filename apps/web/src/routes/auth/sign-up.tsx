import { createFileRoute } from '@tanstack/react-router'
import SignupPage from '@/components/auth/sign-up'

export const Route = createFileRoute('/auth/sign-up')({
  component: SignupPage,
})
