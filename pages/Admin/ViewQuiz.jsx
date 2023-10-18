import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    Keyboard,
    TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../../apis/axios';

const ViewQuiz = ({navigation}) => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [newAnswer, setNewAnswer] = useState('');
    const [editError, setEditError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const selectedQuestionRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('infantQuiz');
                if (response.data && response.data.length > 0) {
                    const flattenedQuestions = response.data.flat();
                    setQuestions(flattenedQuestions);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (selectedQuestion && selectedQuestionRef.current) {
            selectedQuestionRef.current.scrollTo({ animated: true, y: 0 });
        }
    }, [selectedQuestion]);

    const handleQuestionUpdate = (question) => {
        setSelectedQuestion(question);
        setNewAnswer(''); // Reset new answer input when updating
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleQuestionDelete = (questionId) => {
        Alert.alert(
            'Delete Question',
            'Are you sure you want to delete this question?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        try {
                            axios
                                .delete(`infantQuiz/${questionId}`)
                                .then(() => {
                                    setQuestions((prevQuestions) =>
                                        prevQuestions.filter((question) => question._id !== questionId)
                                    );
                                    setSelectedQuestion(null);
                                    Alert.alert('Deleted!', 'The question has been deleted.');
                                });
                        } catch (error) {
                            console.error('Error deleting question:', error);
                            Alert.alert('Error', 'An error occurred while deleting the question.');
                        }
                    },
                },
            ]
        );
    };

    const handleSaveChanges = () => {
        if (!selectedQuestion.question) {
            setEditError('Question is required.');
            return;
        }

        if (!selectedQuestion.answers || selectedQuestion.answers.length === 0) {
            setEditError('At least one answer is required.');
            return;
        }

        if (!selectedQuestion.answers.some((answer) => answer.isCorrect)) {
            setEditError('At least one answer must be correct.');
            return;
        }

        Alert.alert(
            'Save Changes',
            'Are you sure you want to save changes to this question?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Save',
                    onPress: () => {
                        try {
                            axios
                                .put(
                                    `infantQuiz/${selectedQuestion._id}`,
                                    selectedQuestion
                                )
                                .then(() => {
                                    setQuestions((prevQuestions) =>
                                        prevQuestions.map((question) =>
                                            question._id === selectedQuestion._id ? selectedQuestion : question
                                        )
                                    );
                                    setSelectedQuestion(null);
                                    setEditError('');
                                    Alert.alert('Saved!', 'Changes have been saved.');
                                    setIsModalVisible(false);
                                });
                        } catch (error) {
                            console.error('Error updating question:', error);
                            Alert.alert('Error', 'An error occurred while updating the question.');
                        }
                    },
                },
            ]
        );
    };

    const handleAddNewAnswer = () => {
        if (!newAnswer) {
            setEditError('New Answer is required.');
            return;
        }
        const updatedQuestion = { ...selectedQuestion };
        updatedQuestion.answers = updatedQuestion.answers || [];
        updatedQuestion.answers.push({ answer: newAnswer, isCorrect: false });
        setNewAnswer('');
        setSelectedQuestion(updatedQuestion);
    };

    const filteredQuestions = questions.filter((question) =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <FlatList
            style={{ margin: 20 }}
            data={['buttons', 'search', 'questions', 'selectedQuestion']}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
                if (item === 'buttons') {
                    return (
                        <>
                            <Text style={styles.headerText}>Quiz List</Text>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation.navigate('CreateQuizQuestion')}
                            >
                                <Text style={styles.addButtonText}>Add Question</Text>
                            </TouchableOpacity>
                        </>

                    );
                } else if (item === 'search') {
                    return (
                        <TextInput
                            placeholder="Search questions"
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                            style={styles.searchInput}
                        />
                    );
                } else if (item === 'questions') {
                    return (
                        <FlatList
                            data={filteredQuestions}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleQuestionUpdate(item)}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 10,
                                        padding: 15,
                                        marginVertical: 10,
                                        backgroundColor: selectedQuestion?._id === item._id ? '#e6f7ff' : '#fff',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                >
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{item.question}</Text>
                                    <FlatList
                                        data={item.answers}
                                        keyExtractor={(answer, index) => index.toString()}
                                        renderItem={({ item: answer }) => (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                                <Text style={{ marginRight: 5, fontSize: 16 }}>{answer.answer}</Text>
                                                {answer.isCorrect && <Text style={{ color: 'green', fontSize: 14 }}>(Correct)</Text>}
                                            </View>
                                        )}
                                    />
                                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={{backgroundColor: "#FF0000",
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            borderRadius: 8}} onPress={() => handleQuestionDelete(item._id)}>
                                            <Text style={{ color: 'white', fontSize: 16,fontWeight:"bold" }}>Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{backgroundColor: "#004AAD",
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            borderRadius: 8}} onPress={() => handleQuestionUpdate(item)}>
                                            <Text style={{ color: 'white', fontSize: 16,fontWeight:"bold" }}>Update</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    );

                } else if (item === 'selectedQuestion' && selectedQuestion) {
                    return (
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isModalVisible}
                            onRequestClose={() => setIsModalVisible(false)}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <View style={{ width: 340, backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }}>
                                    <TouchableOpacity onPress={handleCloseModal} style={{ alignSelf: 'flex-end', padding: 10 ,marginRight:10,marginTop:5}}>
                                        <Text style={{ fontSize: 16, color: 'red' }}>Close</Text>
                                    </TouchableOpacity>

                                    <View style={{ padding: 20 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Edit Question</Text>
                                        <TextInput
                                            value={selectedQuestion?.question}
                                            onChangeText={(text) => {
                                                const updatedQuestion = { ...selectedQuestion, question: text };
                                                setSelectedQuestion(updatedQuestion);
                                            }}
                                            placeholder="Edit question"
                                            style={{
                                                height: 80,
                                                borderColor: 'gray',
                                                borderWidth: 1,
                                                marginBottom: 20,
                                                fontSize: 16,
                                                paddingLeft: 10,
                                            }}
                                        />

                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Edit Answers</Text>
                                        <FlatList
                                            data={selectedQuestion.answers}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item: answer, index }) => (
                                                <View style={{ marginBottom: 15 }}>
                                                    <TextInput
                                                        value={answer.answer}
                                                        onChangeText={(text) => {
                                                            const updatedQuestion = { ...selectedQuestion };
                                                            updatedQuestion.answers[index].answer = text;
                                                            setSelectedQuestion(updatedQuestion);
                                                        }}
                                                        placeholder="Edit answer"
                                                        style={{
                                                            height: 40,
                                                            borderColor: 'gray',
                                                            borderWidth: 1,
                                                            marginBottom: 10,
                                                            fontSize: 16,
                                                            paddingLeft: 10,
                                                        }}
                                                    />
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                const updatedQuestion = { ...selectedQuestion };
                                                                updatedQuestion.answers[index].isCorrect = !answer.isCorrect;
                                                                setSelectedQuestion(updatedQuestion);
                                                            }}
                                                        >
                                                            <Text style={{ fontSize: 16, color: '#004AAD', marginRight: 10 }}>Correct Answer</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                const updatedQuestion = { ...selectedQuestion };
                                                                updatedQuestion.answers.splice(index, 1);
                                                                setSelectedQuestion(updatedQuestion);
                                                            }}
                                                        >
                                                            <Text style={{ color: 'red', fontSize: 16 }}>Remove Answer</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                        />

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                            <TextInput
                                                value={newAnswer}
                                                onChangeText={(text) => setNewAnswer(text)}
                                                placeholder="New Answer"
                                                style={{
                                                    height: 40,
                                                    borderColor: 'gray',
                                                    borderWidth: 1,
                                                    flex: 1,
                                                    marginRight: 10,
                                                    fontSize: 16,
                                                    paddingLeft: 10,
                                                }}
                                            />
                                            <TouchableOpacity onPress={handleAddNewAnswer} style={{ backgroundColor: '#004AAD', padding: 10, borderRadius: 5 }}>
                                                <Text style={{ color: '#fff', fontSize: 16,fontWeight:"bold" }}>Add Answer</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {editError !== '' && <Text style={{ color: 'red', fontSize: 16, marginBottom: 10 }}>{editError}</Text>}

                                        <TouchableOpacity
                                            onPress={handleSaveChanges}
                                            style={{
                                                backgroundColor: '#004AAD',
                                                padding: 12,
                                                borderRadius: 5,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 18,fontWeight:"bold" }}>Save Changes</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    );

                }
            }}
        />
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 80,
        backgroundColor: "#fff",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        paddingTop: 50,
        color: "#004AAD",
        fontWeight: "900",
        fontSize: 40,
        paddingBottom: 20,
    },
    searchInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    addButton:{
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical:10,
        marginBottom: 16,
        backgroundColor: "#004AAD",
    },
    addButtonText:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold"
    },
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 16,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    specialization: {
        fontSize: 14,
        color: "#555",
    },
    additionalInfo: {
        fontSize: 14,
        color: "#777",
    },
    viewButton: {
        backgroundColor: "#004AAD",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    viewButtonText: {
        color: "#fff",
        fontWeight:"bold"
    },
    deleteButton: {
        backgroundColor: "#FF0000",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 5,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ViewQuiz;
