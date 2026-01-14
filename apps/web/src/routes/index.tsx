import { createFileRoute } from '@tanstack/react-router'
import { authMiddleware } from '@/middleware/auth-middleware'

function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <h1>Home</h1>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  server: { middleware: [authMiddleware] },
})
