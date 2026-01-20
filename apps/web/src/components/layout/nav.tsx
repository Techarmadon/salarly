import { Button } from '@salarly/ui/components/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@salarly/ui/components/navigation-menu'
import { useIsMobile } from '@salarly/ui/hooks/use-mobile'
import { Link } from '@tanstack/react-router'
import { toast } from '@salarly/ui/components/sonner'
import { Skeleton } from '@salarly/ui/components/skeleton'
import { useAuth } from '@/context/auth-provider'
import { logoutFn } from '@/lib/auth-actions'

export default function Navbar() {
  const { user, isPending } = useAuth()
  const isMobile = useIsMobile()

  async function signoutHandler() {
    const error = await logoutFn()

    if (error) {
      toast.error(error.message)
    }
  }

  return (
    <NavigationMenu viewport={isMobile} className='max-w-full *:w-full p-4'>
      <NavigationMenuList className=''>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to='/'>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to='/dashboard'>Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className='ml-auto'>
          <NavigationMenuLink asChild>
            {isPending ? (
              <Skeleton className='w-20 h-9' />
            ) : user ? (
              <Button onClick={signoutHandler}>Logout</Button>
            ) : (
              <Button asChild>
                <Link to='/auth/login'>Login</Link>
              </Button>
            )}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
