import { authClient } from './auth-client'

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const cookies = authClient.getCookie();
    
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Cookie": cookies || "",
        },
        credentials: "omit",
    });
};