import authService from "@/services/authService"
import { createContext, useContext, useEffect, useState } from "react"
import type { Models } from "react-native-appwrite"

type AuthResponse = { success?: boolean; error?: string }

interface AuthContextInterface {
    user: Models.User | null
    loading: boolean
    register: (email: string, password: string) => Promise<AuthResponse>
    login: (email: string, password: string) => Promise<AuthResponse>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextInterface>({
    user: null,
    loading: true,
    register: async () => ({} as AuthResponse),
    login: async () => ({} as AuthResponse),
    logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Models.User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        setLoading(true)
        try {
            const user = await authService.getUser()
            if (!user || "error" in user) {
                setUser(null)
            } else {
                setUser(user)
            }
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        const response = await authService.login(email, password)
        if ("error" in response) {
            return response
        }
        await fetchUser()
        return { success: true }
    }

    const logout = async () => {
        await authService.logout()
        setUser(null)
        await fetchUser()
    }

    const register = async (email: string, password: string) => {
        const response = await authService.register(email, password)
        if ("error" in response) {
            return response
        }
        return login(email, password)
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
