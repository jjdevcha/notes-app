import { Stack } from "expo-router"

const RootLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#EA9010",
                },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
                contentStyle: {
                    paddingHorizontal: 10,
                    paddingTop: 10,
                    backgroundColor: "#fff",
                },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        </Stack>
    )
}

export default RootLayout
