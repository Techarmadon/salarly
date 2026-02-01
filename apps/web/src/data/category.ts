import { prisma } from '@salarly/database'
import type { TRPCRouterRecord } from '@trpc/server'
import { publicProcedure } from '@/integrations/trpc/init'
import { tryCatch } from '@/lib/try-catch'

export const categoryRouter = {
  list: publicProcedure.query(async () => {
    const { data, error } = await tryCatch(prisma.category.findMany())

    return { data, error }
  }),
} satisfies TRPCRouterRecord
