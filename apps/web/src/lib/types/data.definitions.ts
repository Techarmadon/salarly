import { Frequency, TransactionType } from '@salarly/database/types'
import z from 'zod'

export const TransactionSchema = z.object({
  userId: z.string(),

  categoryId: z.string().optional(),

  title: z.string().min(1),
  notes: z.string().optional(),

  type: z.enum(TransactionType),

  rules: z
    .array(
      z.object({
        amount: z.coerce.number().positive(),
        currency: z.string().min(1).optional(),

        frequency: z.enum(Frequency),
        interval: z.number().int().positive().default(1),

        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional(),

        byMonthDay: z.number().int().min(1).max(31).optional(),

        isActive: z.boolean().default(true),
      }),
    )
    .min(1, {
      message: 'A transaction must have at least one recurring rule',
    }),
})
