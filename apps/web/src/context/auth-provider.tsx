import { createContext, useContext } from 'react'
import type { SessionQueryParams, User } from 'better-auth'
import type { ReactNode } from 'react'
import { authClient } from '@/integrations/auth/client'

type AuthContextType = {
  user: User | null
  isPending: boolean
  refetch: (
    queryParams?:
      | {
          query?: SessionQueryParams
        }
      | undefined,
  ) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, refetch } = authClient.useSession()

  return (
    <AuthContext.Provider
      value={{ user: data?.user ?? null, isPending, refetch }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
