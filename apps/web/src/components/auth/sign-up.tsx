import { Button } from '@salarly/ui/components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@salarly/ui/components/card'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FieldError } from '@salarly/ui/components/field'
import type { BetterAuthError, SignupForm } from '@/lib/types/auth.definitions'
import { SignupFormSchema } from '@/lib/types/auth.definitions'
import { FormInput } from '@/components/form'
import { signupFn } from '@/lib/auth-actions'
import Base from '@/components/layout/base'

export default function SignupPage() {
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
    <Base>
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
    </Base>
  )
}
