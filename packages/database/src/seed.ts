import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { prisma } from './client'
import { TransactionType, Frequency } from '../prisma/generated/client'

// Hash password using bcrypt (better-auth compatible)
// better-auth uses bcrypt with 10 rounds by default
async function hashPassword(password: string): Promise<string> {
  try {
    // Try to use bcrypt if available
    const bcrypt = await import('bcrypt')
    return await bcrypt.hash(password, 10)
  } catch (error) {
    // If bcrypt is not available, throw an error with instructions
    throw new Error(
      'bcrypt is required for password hashing. Please install it: pnpm add -D bcrypt @types/bcrypt',
    )
  }
}

;(async () => {
  try {
    // Create test user with credentials
    const testUserEmail = 'user@test.com'
    const testUserPassword = 'admin1234'
    const testUserName = 'Test User'

    // Hash the password
    const hashedPassword = await hashPassword(testUserPassword)

    const testUser = await prisma.user.upsert({
      where: {
        email: testUserEmail,
      },
      update: {
        name: testUserName,
        email: testUserEmail,
      },
      create: {
        id: faker.string.uuid(),
        name: testUserName,
        email: testUserEmail,
        emailVerified: true,
      },
    })

    // Create account for email/password authentication
    // Check if account already exists
    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: testUser.id,
        providerId: 'credential',
        accountId: testUserEmail,
      },
    })

    if (existingAccount) {
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: { password: hashedPassword },
      })
    } else {
      await prisma.account.create({
        data: {
          id: faker.string.uuid(),
          accountId: testUserEmail,
          providerId: 'credential',
          userId: testUser.id,
          password: hashedPassword,
        },
      })
    }

    console.log(
      `Created/updated test user: ${testUserEmail} (password: ${testUserPassword})`,
    )

    // Create categories
    const categoryNames = [
      'Groceries',
      'Restaurants',
      'Transportation',
      'Entertainment',
      'Utilities',
      'Shopping',
      'Healthcare',
      'Education',
      'Salary',
      'Freelance',
      'Investment',
      'Gift',
    ]

    const categories = await Promise.all(
      categoryNames.map((name) =>
        prisma.category.upsert({
          where: { name },
          update: {},
          create: {
            id: faker.string.uuid(),
            name,
          },
        }),
      ),
    )

    console.log(`Created/updated ${categories.length} categor(ies)`)

    // Delete existing transactions for the test user to avoid duplicates
    await prisma.transaction.deleteMany({
      where: {
        userId: testUser.id,
      },
    })

    // Create a mix of one-time and recurring transactions
    const oneTimeTransactionsCount = 30
    const recurringTransactionsCount = 5

    const oneTimeTransactions = Array.from(
      { length: oneTimeTransactionsCount },
      () => {
        const type = faker.helpers.arrayElement<TransactionType>([
          'INCOME',
          'COST',
        ])
        const hasCategory = faker.datatype.boolean({ probability: 0.8 })
        const category = hasCategory
          ? faker.helpers.arrayElement(categories)
          : null

        return {
          id: faker.string.uuid(),
          userId: testUser.id,
          categoryId: category?.id ?? null,
          type,
        }
      },
    )

    // Create one-time transactions
    const batchSize = 100
    for (let i = 0; i < oneTimeTransactions.length; i += batchSize) {
      const batch = oneTimeTransactions.slice(i, i + batchSize)
      await prisma.transaction.createMany({
        data: batch,
      })
    }

    console.log(`Created ${oneTimeTransactions.length} one-time transaction(s)`)

    // Create recurring transactions with rules
    const recurringTransactions = []
    const recurringRules = []

    for (let i = 0; i < recurringTransactionsCount; i++) {
      const type = faker.helpers.arrayElement<TransactionType>([
        'INCOME',
        'COST',
      ])
      const hasCategory = faker.datatype.boolean({ probability: 0.8 })
      const category = hasCategory
        ? faker.helpers.arrayElement(categories)
        : null

      const transactionId = faker.string.uuid()
      const frequency = faker.helpers.arrayElement<Frequency>([
        'DAILY',
        'WEEKLY',
        'MONTHLY',
        'YEARLY',
      ])
      const amount = faker.number.float({
        min: 10,
        max: 1000,
        fractionDigits: 2,
      })
      const startDate = faker.date.past({ years: 1 })
      const endDate = faker.datatype.boolean({ probability: 0.3 })
        ? faker.date.future({ years: 1 })
        : null
      const byMonthDay =
        frequency === 'MONTHLY' ? faker.number.int({ min: 1, max: 28 }) : null

      recurringTransactions.push({
        id: transactionId,
        userId: testUser.id,
        categoryId: category?.id ?? null,
        type,
      })

      recurringRules.push({
        id: faker.string.uuid(),
        transactionId,
        amount,
        currency: 'USD',
        frequency,
        interval: 1,
        startDate,
        endDate,
        byMonthDay,
      })
    }

    // Create recurring transactions
    for (const transaction of recurringTransactions) {
      await prisma.transaction.create({
        data: transaction,
      })
    }

    // Create recurring rules
    for (const rule of recurringRules) {
      await prisma.recurringRule.create({
        data: rule,
      })
    }

    console.log(
      `Created ${recurringTransactions.length} recurring transaction(s) with rules`,
    )

    console.log('Seed completed successfully!')
    console.log(`\nTest credentials:`)
    console.log(`  Email: ${testUserEmail}`)
    console.log(`  Password: ${testUserPassword}`)
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()
