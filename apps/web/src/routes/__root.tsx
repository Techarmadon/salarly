import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import globalStyles from '@/globals.css?url'
import TanStackQueryQueryDevtools from '@/integrations/tanstack-query/devtools'

const head = () => ({
  meta: [
    { charSet: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    { title: 'TanStack Start Starter' },
  ],
  links: [
    {
      rel: 'stylesheet',
      href: globalStyles,
    },
  ],
})

interface RootLayoutProps {
  children: ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head,
    shellComponent: RootLayout,
  },
)
