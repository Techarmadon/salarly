import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/context/auth-provider'

function Home() {
  const { user } = useAuth()
  return (
    <div className='flex min-h-screen-with-nav items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <div className='flex flex-col'>
        <h1>{user ? `Welcome back, ${user.name}` : 'Welcome to Salary!'}</h1>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})
