import { v4 as uuidv4 } from "uuid"
import databaseService from "./databaseService"

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID
const tableId = process.env.EXPO_PUBLIC_APPWRITE_TABLE_NOTES_ID

if (!dbId) {
    throw new Error(
        "Environment variable EXPO_PUBLIC_APPWRITE_DB_ID is not set"
    )
}
if (!tableId) {
    throw new Error(
        "Environment variable EXPO_PUBLIC_APPWRITE_TABLE_NOTES_ID is not set"
    )
}
const noteService = {
    async getNotes() {
        const response = await databaseService.getNotes(dbId, tableId)
        if (!response || response?.error) {
            return { error: response?.error || "Failed to fetch notes" }
        }
        return { data: response }
    },
    async createNote(data: object) {
        const id = uuidv4()
        const response = await databaseService.createNote(
            dbId,
            tableId,
            data,
            id
        )
        if (!response || response?.error) {
            return { error: response?.error || "Failed to create note" }
        }
        return { data: response }
    },
    async deleteNote(id: string) {
        const response = await databaseService.deleteNote(dbId, tableId, id)
        if (!response || response?.error) {
            return { error: response?.error || "Failed to delete note" }
        }
        return { data: response }
    },
    async updateNote(id: string, data: object) {
        const response = await databaseService.updateNote(
            dbId,
            tableId,
            id,
            data
        )
        if (!response || response?.error) {
            return { error: response?.error || "Failed to update note" }
        }
        return { data: response }
    },
}

export default noteService
