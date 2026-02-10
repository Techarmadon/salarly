import { createAuthClient } from 'better-auth/react'
import { expoClient } from '@better-auth/expo/client'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

const getBaseURL = () => {
  if (__DEV__) {
    if (process.env.EXPO_PUBLIC_API_URL) {
      return process.env.EXPO_PUBLIC_API_URL
    }

    const debuggerHost = Constants.expoConfig?.hostUri?.split(':')[0]
    if (debuggerHost) {
      return `http://${debuggerHost}:3000`
    }

    throw new Error(
      'Unable to determine API URL. Set EXPO_PUBLIC_API_URL or run via Expo debugger.',
    )
  }

  if (!process.env.EXPO_PUBLIC_API_URL) {
    throw new Error('EXPO_PUBLIC_API_URL must be set in production')
  }
  return process.env.EXPO_PUBLIC_API_URL
}

const baseURL = getBaseURL()

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: 'salarly',
      storagePrefix: 'salarly',
      storage: SecureStore,
    }),
  ],
})

export const { useSession, signIn, signOut, signUp } = authClient
