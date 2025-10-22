import PostItImg from "@/assets/images/post-it.png"
import { useRouter } from "expo-router"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Home = () => {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <Image source={PostItImg} />
            <Text style={styles.title}>Welcome to My Notes app</Text>
            <Text style={styles.subtitle}>
                Capture your thoughts, anytime, anywhere
            </Text>
            <TouchableOpacity
                onPress={() => router.push("/notes")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#90BE6D",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
})

export default Home
