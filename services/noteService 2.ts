import databaseService from "./databaseService"

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID

if (!dbId) {
    throw new Error("Environment variable EXPO_PUBLIC_APPWRITE_DB_ID is not set");
}
if (!colId) {
    throw new Error("Environment variable EXPO_PUBLIC_APPWRITE_COL_NOTES_ID is not set");
}
const noteService = {
    // Get Notes
    async getNotes() {
        const response = await databaseService.listDocuments(dbId, colId)
        if (response.error) {
            return { error: response.error }
        }
        return { data: response }
    },
}

export default noteService
