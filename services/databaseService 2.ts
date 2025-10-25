import { database } from "./appwrite"

const databaseService = {
    // List Documents
    async listDocuments(dbId: string, colId: string) {
        try {
            const response = await database.listDocuments(dbId, colId)
            return response.documents || []
        } catch (error) {
            console.error("Error listing documents:", error)
            return { error: error || "Unknown error" }
        }
    },
}

export default databaseService
