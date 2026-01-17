import { Button } from '@salarly/ui/components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@salarly/ui/components/card'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError } from '@salarly/ui/components/field'
import type { BetterAuthError, SignupForm } from '@/lib/definitions'
import { SignupFormSchema } from '@/lib/definitions'
import { FormInput } from '@/components/form'
import { signupFn } from '@/lib/auth-actions'
import { authMiddleware } from '@/middleware/auth-middleware'

export const Route = createFileRoute('/auth/sign-up')({
  component: SignupPage,
  server: { middleware: [authMiddleware] },
})

function SignupPage() {
  const [error, setError] = useState<BetterAuthError | null>(null)

  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  async function onSubmit(values: SignupForm) {
    // eslint-disable-next-line no-shadow
    const error = await signupFn(values)
    if (error) setError(error)
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black p-4'>
      <Card className='max-w-110 w-full'>
        <CardHeader>
          <CardTitle>New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id='signupForm'
            className='space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              formControl={form.control}
              formLabel={'Full Name'}
              formName='name'
            />

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
            {error && (
              <FieldError className='text-red-500'>{error.message}</FieldError>
            )}
          </form>
        </CardContent>
        <CardFooter className='flex gap-3'>
          <Button asChild variant='secondary' className='flex-1'>
            <Link to='/auth/login'>Back</Link>
          </Button>
          <Button form='signupForm' className='flex-1'>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
