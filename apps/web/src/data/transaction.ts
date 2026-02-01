import { findTransactions } from './transactions.server'
import type { TRPCRouterRecord } from '@trpc/server'
import { publicProcedure } from '@/integrations/trpc/init'

export const transactionRouter = {
  list: publicProcedure.query(async () => {
    const { data, error } = await findTransactions()

    return { data, error }
  }),
} satisfies TRPCRouterRecord
