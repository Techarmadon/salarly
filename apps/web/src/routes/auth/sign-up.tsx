import { Button } from '@salarly/ui/components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@salarly/ui/components/card'
import { Input } from '@salarly/ui/components/input'
import { Label } from '@salarly/ui/components/label'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black'>
      <Card className='max-w-110 w-full'>
        <CardHeader>
          <CardTitle>New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <Label>Full Name</Label>
            <Input />

            <Label>Email</Label>
            <Input />

            <Label>Password</Label>
            <Input />
          </form>
        </CardContent>
        <CardFooter className='flex gap-3'>
          <Button asChild variant='secondary' className='flex-1'>
            <Link to='/auth/login'>Back</Link>
          </Button>
          <Button className='flex-1'>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
