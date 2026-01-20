import { Button } from '@salarly/ui/components/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgot-password')({
  preload: false,
  component: () => {
    return (
      <Button
        onClick={
          // Implement better-auth await authClient.requestPasswordReset()
          async () => {}
        }
      >
        Reset
      </Button>
    )
  },
})
