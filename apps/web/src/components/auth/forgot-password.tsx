import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@salarly/ui/components/button'
import { Link } from '@tanstack/react-router'
import { MoveLeft } from 'lucide-react'
import { FormInput } from '../form'
import type { ResetPasswordForm } from '@/lib/types/auth.definitions'
import { ResetPasswordFormSchema } from '@/lib/types/auth.definitions'
import Base from '@/components/layout/base'

export default function ForgotPasswordPage() {
  const form = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(values: ResetPasswordForm) {
    // Implement better-auth await authClient.requestPasswordReset()
  }

  return (
    <Base className='relative'>
      <Button asChild variant='ghost' className='absolute top-4 left-4'>
        <Link to='/auth/login'>
          <MoveLeft /> <span>Back</span>
        </Link>
      </Button>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className='text-2xl font-bold text-center my-4'>
          Reset your password
        </h1>
        <div className='flex flex-col gap-3'>
          <FormInput
            formControl={form.control}
            formName='email'
            formLabel='Email'
            formDescription='Enter your email address and we will send you a password reset link.'
          />
          <Button>Send password reset email</Button>
        </div>
      </form>
    </Base>
  )
}
