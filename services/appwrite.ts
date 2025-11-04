import { Platform } from "react-native"
import { Account, Client, TablesDB } from "react-native-appwrite"

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
    tables: {
        notes: process.env.EXPO_PUBLIC_APPWRITE_TABLE_NOTES_ID,
    },
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

const database = new TablesDB(client)

const account = new Account(client)

export { account, client, config, database }
