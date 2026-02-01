import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const trpc = useTRPC()
  const { data: transactions } = useQuery({
    ...trpc.transaction.list.queryOptions(),
  })

  console.log(transactions)
  return <div>Hello "/_protected/dashboard"!</div>
}
