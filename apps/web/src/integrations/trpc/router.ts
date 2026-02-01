import { createTRPCRouter } from './init'
import { categoryRouter } from '@/data/category'
import { transactionRouter } from '@/data/transaction'

export const trpcRouter = createTRPCRouter({
  transaction: transactionRouter,
  category: categoryRouter,
})
export type TRPCRouter = typeof trpcRouter
