import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from "react-native";
import Axios from "../apis/axios";

const AddText = ( {navigation, obj} ) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [editableText, setEditableText] = useState(obj.word);
    const [editableObj, setEditableObj] = useState(obj);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleEditText = async () => {
        try {
            const response = await Axios.put(`word/${editableObj._id}`, { word: editableText });
            if (response.status === 200) {
                // Text edited successfully, update the list
                // alert('success')
                navigation.navigate("Admin");

            } else {
                console.error('Failed to edit text');
            }
        } catch (error) {
            console.error('An error occurred while editing text:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <Text style={styles.addButtonText}>Edit</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                    toggleModal();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>This is a Popup!</Text>
                        <TextInput
                            placeholder="Enter Text"
                            style={styles.searchInput}
                            value={editableText}
                            onChangeText={(newText) => {
                                setEditableText(newText);
                            }}
                        />
                        <TouchableOpacity style={styles.editButton} onPress={handleEditText}>
                            <Text>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addButton: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: "#004AAD",
    },
    addButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
        width: '100%',
    },
    editButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
    },
});

export default AddText;
