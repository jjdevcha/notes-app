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
        } catch (error) {
            return {
                error:
                    error.message || "Registration failed. Please try again.",
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
        } catch (error) {
            return {
                error: error.message || "Login failed. Please try again.",
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
            return {
                error: error.message || "Logout failed. Please try again.",
            }
        }
    },
}
export default authService
