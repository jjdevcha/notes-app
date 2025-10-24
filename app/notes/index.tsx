import AddNoteModal from "@/components/AddNoteModal"
import NoteList from "@/components/NoteList"
import noteService from "@/services/noteService"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

interface Note {
    $id: string
    text: string
}

const NoteScreen = () => {
    const router = useRouter()
    const [notes, setNotes] = useState<Note[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [newNote, setNewNote] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true)
            const response = await noteService.getNotes()
            if (response.error) {
                setError(response.error)
                Alert.alert("Error", response.error)
            } else {
                setNotes(response.data)
                setError(null)
            }
            setLoading(false)
        }
        fetchNotes()
    }, [])

    const addNote = () => {
        if (newNote.trim() === "") return
        // Call API to add note
        setNewNote("")
        setModalVisible(false)
    }

    const deleteNote = (id) => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        // Call API to delete note
                        setNotes((prevNotes) =>
                            prevNotes.filter((note) => note.$id !== id)
                        )
                    },
                },
            ]
        )
    }
    const editNote = (id, newText) => {
        if (!newText.trim()) return
        // Call API to edit note
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.$id === id ? { ...note, text: newText } : note
            )
        )
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#EA9010" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : notes.length > 0 ? (
                <NoteList
                    notes={notes}
                    onDelete={deleteNote}
                    onEdit={editNote}
                />
            ) : (
                <Text style={styles.noNotesText}>No notes available</Text>
            )}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>✚ Add Note</Text>
            </TouchableOpacity>

            {/* Modal */}
            <AddNoteModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#90BE6D",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16,
    },
    noNotesText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#37371F",
        marginTop: 15,
    },
})

export default NoteScreen
