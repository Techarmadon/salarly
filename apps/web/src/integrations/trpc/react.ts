import { createTRPCContext } from '@trpc/tanstack-react-query'
import type { TRPCRouter } from '@/integrations/trpc/router'

const trpc = createTRPCContext<TRPCRouter>()

type TRPCContextResult = ReturnType<typeof createTRPCContext<TRPCRouter>>

export const TRPCProvider: TRPCContextResult['TRPCProvider'] = trpc.TRPCProvider
export const useTRPC: TRPCContextResult['useTRPC'] = trpc.useTRPC
