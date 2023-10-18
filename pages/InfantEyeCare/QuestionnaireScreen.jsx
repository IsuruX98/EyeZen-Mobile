import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from '../../apis/axios';
import ayurvedicsections from "../../assets/ayurvrdic/ayurvedicsections.png";

const QuestionnaireScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch quiz questions from the backend when the component mounts
        axios.get('infantQuiz')
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const combinedQuestions = response.data.flat();
                    setQuestions(combinedQuestions);
                }
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleAnswerSelect = (questionId, selectedAnswerId) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: selectedAnswerId,
        });
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitAnswers = () => {
        axios.post('infantQuiz/check', { userAnswers })
            .then((response) => {
                const calculatedPercentage = (response.data.score / questions.length) * 100;
                setPercentage(calculatedPercentage.toFixed(2));
                setScore(response.data.score);
            })
            .catch(error => {
                console.error("Error fetching API:", error);
                setPercentage('N/A');
                setScore(null);
            });
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={styles.loadingIndicator} size="large" color="#004AAD" />
            ) : score === null ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.questionText}>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Text>
                    <Text style={styles.question}>{questions[currentQuestionIndex]?.question}</Text>
                    {questions[currentQuestionIndex]?.answers?.map((answer) => (
                        <TouchableOpacity
                            key={answer.id}
                            onPress={() => handleAnswerSelect(questions[currentQuestionIndex].id, answer.id)}
                            style={[
                                styles.answerButton,
                                {
                                    backgroundColor: answer.id === userAnswers[questions[currentQuestionIndex].id]
                                        ? '#004AAD'
                                        : '#004AAD',
                                },
                            ]}
                        >
                            <Text style={styles.buttonText}>{answer.answer}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.buttonContainer}>
                        {currentQuestionIndex > 0 && (
                            <TouchableOpacity onPress={handlePreviousQuestion} style={styles.navigationButton}>
                                <Text style={styles.buttonText}>Previous</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={currentQuestionIndex < questions.length - 1
                            ? handleNextQuestion
                            : handleSubmitAnswers
                        } style={styles.navigationButton}>
                            <Text style={styles.buttonText}>
                                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.container1}>
                    <View style={styles.textContainer1}>
                        <Text style={styles.header1}>Score Obtained: {percentage}%</Text>
                        <View>
                            {percentage < 50 && (
                                <>
                                    <Text style={styles.description1}>Vision seems to be poor</Text>
                                    <Text style={styles.description1}>Highly recommended to meet an ophthalmologist</Text>
                                </>
                            )}
                            {percentage >= 50 && percentage < 75 && (
                                <>
                                    <Text style={styles.description1}>Vision seems to be a bit weak</Text>
                                    <Text style={styles.description1}>Recommendation: Meet an ophthalmologist</Text>
                                </>
                            )}
                            {percentage >= 75 && (
                                <Text style={styles.description1}>Vision seems to be good</Text>
                            )}
                        </View>

                        <View style={styles.buttonContainer1}>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={() => {
                                    navigation.navigate("InfantQuizHome");
                                }}
                            >
                                <Text style={styles.buttonText1}>Back To Home Page</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={() => {
                                    navigation.navigate("InfantQuizHome");
                                }}
                            >
                                <Text style={styles.buttonText1}>Generate PDF</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.imageContainer1}>
                        <Image
                            style={styles.image1}
                            source={ayurvedicsections}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        paddingVertical: 20,
    },
    answerButton: {
        backgroundColor: '#004AAD',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    navigationButton: {
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 10,
        width: '48%',
    },
    textContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#004AAD',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#004AAD',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '90%',
        borderRadius: 20,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container1: {
        flex: 1,
        paddingTop: 80,
        justifyContent: "center",
    },
    textContainer1: {
        alignItems: "center",
        paddingTop: 20,
    },
    header1: {
        textAlign:"center",
        fontSize: 40,
        fontWeight: "900",
        color: "#004AAD",
    },
    description1: {
        textAlign:"center",
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 10,
    },
    paragraph1: {
        fontSize: 16,
        textAlign: "center",
        paddingTop: 10,
    },
    buttonContainer1: {
        marginTop: 40,
        gap: 10,
    },
    button1: {
        textAlign:"center",
        backgroundColor: "#004AAD",
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 5,
        marginHorizontal: 10,
        alignItems: "center",
    },
    buttonText1: {
        textAlign:"center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image1: {
        width: "100%",
        height: "90%",
        borderRadius: 20,
    },
});

export default QuestionnaireScreen;
