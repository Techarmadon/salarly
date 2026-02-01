'use client'

import { useQuery } from '@tanstack/react-query'
import type { Transaction } from '@salarly/database/types'
import type { ColumnDef } from '@tanstack/react-table'
import { useTRPC } from '@/integrations/trpc/react'

export const columns: Array<ColumnDef<Transaction>> = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const id = row.original.id
      return <span className='font-mono text-xs'>{id.slice(0, 8) + '...'}</span>
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type
      return (
        <span className={type === 'INCOME' ? 'text-green-600' : 'text-red-600'}>
          {type}
        </span>
      )
    },
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row }) => {
      const trpc = useTRPC()
      const { data: categories } = useQuery({
        ...trpc.category.list.queryOptions(),
      })
      const cellCategory = categories?.data?.find(
        (c) => c.id === row.original.categoryId,
      )
      return <span>{cellCategory?.name}</span>
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const date = row.original.createdAt
      return <span>{new Date(date).toLocaleDateString()}</span>
    },
  },
]
