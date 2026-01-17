import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@salarly/ui/components/button'
import { useState } from 'react'
import { FieldError } from '@salarly/ui/components/field'
import type { BetterAuthError } from '@/lib/definitions'
import { authMiddleware } from '@/middleware/auth-middleware'
import { signoutFn } from '@/lib/auth-actions'

function Home() {
  const [error, setError] = useState<BetterAuthError | null>(null)

  async function signoutHandler() {
    // eslint-disable-next-line no-shadow
    const error = await signoutFn()

    if (error) setError(error)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <div className='flex flex-col'>
        <h1>Home</h1>
        <Button onClick={signoutHandler}>Logout Out</Button>
        {error && <FieldError>{error.message}</FieldError>}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  server: { middleware: [authMiddleware] },
})
