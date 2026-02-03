import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import Constants from 'expo-constants';

const getBaseURL = () => {
    if (__DEV__) {
        const debuggerHost = Constants.expoConfig?.hostUri?.split(':')[0];
        
        if (process.env.EXPO_PUBLIC_API_URL) {
            return process.env.EXPO_PUBLIC_API_URL;
        }
        
        if (debuggerHost) {
            return `http://${debuggerHost}:3000`;
        }
        
        return "http://192.168.1.X:3000";
    }
    
    return process.env.EXPO_PUBLIC_API_URL || "https://your-production-url.com";
};

const baseURL = getBaseURL();

export const authClient = createAuthClient({
    baseURL,
    plugins: [
        expoClient({
            scheme: "salarly",
            storagePrefix: "salarly",
            storage: SecureStore,
        })
    ]
});

export const { useSession, signIn, signOut, signUp } = authClient;