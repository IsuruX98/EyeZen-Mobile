import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Modal} from "react-native";
import Axios from "../../apis/axios";
import UpdateModel from "../updateModel";
import {useFocusEffect} from "@react-navigation/native";

const AddText = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [text, setText] = useState('');
    const [textList, setTextList] = useState([]);
    const [editText, setEditText] = useState({});
    const [editableText, setEditableText] = useState('');
    const [updatedText, setUpdatedText] = useState('');

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (textObj) => {
        setEditText(textObj)
        setEditableText(textObj.word)
        setModalVisible(!isModalVisible);
    };

    useFocusEffect(
        React.useCallback(() => {
            // Fetch data here
            fetchData();

            return () => {
                // Clean up if necessary
            };
        }, [])
    );

    useEffect(() => {
        // Fetch all texts when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Axios.get('word'); // Assuming your backend endpoint is '/api/words'
            setTextList(response.data);
        } catch (error) {
            console.error('Error fetching texts:', error);
        }
    };

    const handleAddText = async () => {
        try {
            const response = await Axios.post('word', { word: text });
            if (response.status === 201) {
                // Text added successfully, update the list
                fetchData();
                setText('');
            } else {
                console.error('Failed to add text');
            }
        } catch (error) {
            console.error('An error occurred while adding text:', error);
        }
    };


    const handleEditText = async () => {
        try {
            const response = await Axios.put(`word/${editText._id}`, { word: editableText });
            if (response.status === 200) {
                // Text edited successfully, update the list
                fetchData();
            } else {
                console.error('Failed to edit text');
            }
        } catch (error) {
            console.error('An error occurred while editing text:', error);
        }
    };

    const handleDeleteText = async (id) => {
        try {
            const response = await Axios.delete(`word/${id}`);
            if (response.status === 204) {
                // Text deleted successfully, update the list
                fetchData();
            } else {
                console.error('Failed to delete text');
            }
        } catch (error) {
            console.error('An error occurred while deleting text:', error);
        }
    };



    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.word}</Text>
            {/*<TouchableOpacity style={styles.editButton} onPress={() => handleEditText(item._id, 'New Edited Text')}>*/}
            {/*    <Text>Edit</Text>*/}
            {/*</TouchableOpacity>*/}
            <UpdateModel obj={item} navigation={navigation}/>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteText(item._id)}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const handleInput=()=>{

    }

    const ModelView = ()=>(
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
    )

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Add Text</Text>
            <TextInput
                placeholder="Add Text"
                style={styles.searchInput}
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddText}>
                <Text style={styles.addButtonText}>Add Text</Text>
            </TouchableOpacity>
            <FlatList
                data={textList}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        textAlign: "center",
        marginTop: 72,
        fontSize: 24,
        fontWeight: "bold",
    },
    searchInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        marginTop: 16,
    },
    addButton: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        backgroundColor: "#004AAD",
    },
    addButtonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    text: {
        flex: 1,
        fontSize: 18,
        marginRight: 10,
    },
    editButton: {
        backgroundColor: 'green',
        padding: 8,
        borderRadius: 5,
        marginRight: 10
    },
    deleteButton: {
        backgroundColor: '#F74B4B',
        padding: 8,
        borderRadius: 5,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
    },
});

export default AddText;
