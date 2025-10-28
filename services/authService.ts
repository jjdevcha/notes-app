import { ID } from "react-native-appwrite"
import { account } from "./appwrite"

const authService = {
    async register(email: string, password: string) {
        try {
            const response = await account.create({
                userId: ID.unique(),
                email,
                password,
            })
            return response
        } catch (error: unknown) {
            let message = "Registration failed. Please try again."
            if (error instanceof Error) {
                message = error.message
            }
            return {
                error: message,
            }
        }
    },
    async login(email: string, password: string) {
        try {
            const response = await account.createEmailPasswordSession({
                email,
                password,
            })
            return response
        } catch (error: unknown) {
            let message = "Login failed. Please try again."
            if (error instanceof Error) {
                message = error.message
            }
            return {
                error: message,
            }
        }
    },
    async getUser() {
        try {
            return await account.get()
        } catch (error) {
            console.error("Error fetching user:", error)
            return null
        }
    },
    async logout() {
        try {
            await account.deleteSession({ sessionId: "current" })
        } catch (error) {
            let message = "Logout failed. Please try again."
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    },
}
export default authService
