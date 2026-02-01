import { createTRPCRouter } from './init'
import { transactionRouter } from '@/data/transaction'

export const trpcRouter = createTRPCRouter({ transaction: transactionRouter })
export type TRPCRouter = typeof trpcRouter
