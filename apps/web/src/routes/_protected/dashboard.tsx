import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { DataTable } from './dashboard/data-table'
import { columns } from './dashboard/columns'
import { useTRPC } from '@/integrations/trpc/react'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const trpc = useTRPC()
  const { data: transactions } = useQuery({
    ...trpc.transaction.list.queryOptions(),
  })

  return (
    <div className='container mx-auto py-10'>
      <h1 className='mb-6 text-2xl font-bold'>Transactions</h1>
      <DataTable columns={columns} data={transactions?.data ?? []} />
    </div>
  )
}
