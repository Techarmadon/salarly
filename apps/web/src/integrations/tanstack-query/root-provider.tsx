import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function getContext() {
  const queryClient = new QueryClient()
  return {
    queryClient,
  }
}

interface QueryProviderProps {
  children: React.ReactNode
  queryClient: QueryClient
}

export default function QueryProvider({
  children,
  queryClient,
}: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
