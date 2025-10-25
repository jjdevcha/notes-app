import { useRef, useState } from "react"
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

interface NoteItemProps {
    note: {
        $id: string
        text: string
    }
    onDelete: (id: string) => void
    onEdit: (id: string, newText: string) => void
}

const NoteItem = ({ note, onDelete, onEdit }: NoteItemProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedText, setEditedText] = useState(note.text)
    const inputRef = useRef<TextInput>(null)

    const handleSave = () => {
        if (editedText.trim() === "") return
        onEdit(note.$id, editedText)
        setIsEditing(false)
    }

    const handleDelete = (noteId: string) => {
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
                    onPress: () => onDelete(noteId),
                },
            ]
        )
    }

    return (
        <View style={styles.noteItem}>
            {isEditing ? (
                <TextInput
                    ref={inputRef}
                    value={editedText}
                    onChangeText={setEditedText}
                    onSubmitEditing={handleSave}
                    style={styles.input}
                    autoFocus
                    returnKeyType="done"
                />
            ) : (
                <Text style={styles.noteText}>{note.text}</Text>
            )}
            <View style={styles.actions}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={() => {
                            handleSave()
                            inputRef.current?.blur
                        }}
                    >
                        <Text style={styles.edit}>💾</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Text style={styles.edit}>✏️</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => handleDelete(note.$id)}>
                    <Text style={styles.delete}>❌</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    noteItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    noteText: {
        fontSize: 18,
    },
    delete: {
        fontSize: 18,
        color: "red",
    },
    actions: {
        flexDirection: "row",
    },
    edit: {
        fontSize: 18,
        marginRight: 10,
        color: "blue",
    },
})

export default NoteItem
