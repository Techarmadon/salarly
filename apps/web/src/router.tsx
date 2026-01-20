import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { AuthProvider } from './context/auth-provider'
import type { ReactNode } from 'react'
import QueryProvider, {
  getContext,
} from '@/integrations/tanstack-query/root-provider'

export function getRouter() {
  const reactQueryContext = getContext()

  const router = createRouter({
    routeTree,
    context: { ...reactQueryContext },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultNotFoundComponent: () => {},
    Wrap: (props: { children: ReactNode }) => {
      return (
        <AuthProvider>
          <QueryProvider {...reactQueryContext}>{props.children}</QueryProvider>
        </AuthProvider>
      )
    },
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient: reactQueryContext.queryClient,
  })

  return router
}
