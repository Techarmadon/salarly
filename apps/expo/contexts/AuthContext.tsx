import { authClient } from '@/lib/auth-client'
import { router } from 'expo-router'
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'

type Session = ReturnType<typeof authClient.useSession>['data']

type AuthContextType = {
  isLoggedIn: boolean
  user: { email: string } | null
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  session: Session
  isPending: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { data: session, isPending } = authClient.useSession()

  const login = useCallback(async (email: string, password: string) => {
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      })

      if (result.error) {
        return {
          success: false,
          error: result.error.message || 'Login failed',
        }
      }

      router.replace('/')
      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error'
      return { success: false, error: errorMessage }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authClient.signOut()
      router.replace('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }, [])

  const value: AuthContextType = useMemo(
    () => ({
      session,
      isPending,
      isLoggedIn: !!session,
      user: session?.user ?? null,
      login,
      logout,
    }),
    [session, isPending, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
