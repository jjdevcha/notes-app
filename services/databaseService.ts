import { database } from "./appwrite"

const databaseService = {
    async getNotes(dbId: string, tableId: string) {
        try {
            const response = await database.listRows({
                databaseId: dbId,
                tableId: tableId,
            })
            return response?.rows || []
        } catch (error) {
            console.error("Error listing documents:", error)
            return { error: error || "Unknown error" }
        }
    },
    async createNote(dbId: string, tableId: string, data: object, id: string) {
        try {
            return await database.createRow({
                databaseId: dbId,
                tableId: tableId,
                rowId: id,
                data,
            })
        } catch (error) {
            console.error("Error creating document:", error)
            return { error: error || "Unknown error" }
        }
    },
    async deleteNote(dbId: string, tableId: string, id: string) {
        try {
            return await database.deleteRow({
                databaseId: dbId,
                tableId: tableId,
                rowId: id,
            })
        } catch (error) {
            console.error("Error deleting document:", error)
            return { error: error || "Unknown error" }
        }
    },
    async updateNote(dbId: string, tableId: string, id: string, data: object) {
        try {
            return await database.updateRow({
                databaseId: dbId,
                tableId: tableId,
                rowId: id,
                data: data,
            })
        } catch (error) {
            console.error("Error updating document:", error)
            return { error: error || "Unknown error" }
        }
    },
}

export default databaseService
