import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '@salarly/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@salarly/ui/components/card'
import { Separator } from '@salarly/ui/components/separator'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError } from '@salarly/ui/components/field'
import type { BetterAuthError, LoginForm } from '@/lib/definitions'
import piggy from '@/public/piggy.png'
import { getSession, loginFn } from '@/lib/auth-actions'
import { LoginFormSchema } from '@/lib/definitions'
import { FormInput } from '@/components/form'


export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
  beforeLoad: async () => {

    const session = await getSession()

    if (session) throw redirect({ to: '/' })
  },
})

function LoginPage() {
  const [error, setError] = useState<BetterAuthError | null>(null)

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: LoginForm) {
    const _error = await loginFn(values)

    if (error) setError(_error)
  }

  return (
    <div className='flex items-center justify-center min-h-screen-with-nav bg-zinc-50 font-sans dark:bg-black p-4'>
      <Card className='container flex flex-row'>
        <div className='flex-1 space-y-4 max-w-110'>
          <CardHeader>
            <CardTitle>Welcome to Salarly!</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className='space-y-3'>
            <form
              id='loginForm'
              className='space-y-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormInput
                formControl={form.control}
                formLabel={'Email'}
                formName='email'
              />

              <FormInput
                formControl={form.control}
                formLabel={'Password'}
                formName='password'
                type='password'
              />
            </form>
            {error && (
              <FieldError className='text-red-500'>{error.message}</FieldError>
            )}
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button form='loginForm' className='w-full'>
              Login
            </Button>
            <CardDescription className='flex-1 flex justify-center items-center'>
              <span>Don't have an account?</span>
              <Button
                asChild
                variant='link'
                size='sm'
                className='text-blue-700/70'
              >
                <Link to='/auth/sign-up'>Sign-up</Link>
              </Button>
            </CardDescription>
          </CardFooter>
        </div>
        <CardContent className='flex-1 max-md:hidden flex items-center'>
          <img src={piggy} alt='piggy' className='rounded-md' />
        </CardContent>
      </Card>
    </div>
  )
}
