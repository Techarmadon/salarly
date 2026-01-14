import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@salarly/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@salarly/ui/components/card'
import { Input } from '@salarly/ui/components/input'
import { Label } from '@salarly/ui/components/label'
import { Separator } from '@salarly/ui/components/separator'
import piggy from '@/public/piggy.png'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black'>
      <Card className='container flex flex-row'>
        <div className='flex-1 space-y-4 max-w-110'>
          <CardHeader>
            <CardTitle>Welcome to Salarly!</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className='space-y-3'>
            <form className='space-y-4'>
              <Label>Email</Label>
              <Input />
              <Label>Password</Label>
              <Input />
            </form>
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button className='w-full'>Login</Button>
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
        <CardContent className='flex-1'>
          <img src={piggy} alt='piggy' className='rounded-md' />
        </CardContent>
      </Card>
    </div>
  )
}
