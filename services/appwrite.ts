import { Platform } from "react-native"
import { Client, Databases } from "react-native-appwrite"

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    col: {
        notes: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID,
    },
}

if (!config.endpoint) {
    throw new Error("Appwrite endpoint is not defined. Please set EXPO_PUBLIC_APPWRITE_ENDPOINT in your environment.");
}
if (!config.projectId) {
    throw new Error("Appwrite projectId is not defined. Please set EXPO_PUBLIC_APPWRITE_PROJECT_ID in your environment.");
}
const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)

switch (Platform.OS) {
    case "ios":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID)
        break
    case "android":
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME)
        break
}

const database = new Databases(client)

export { client, config, database }
