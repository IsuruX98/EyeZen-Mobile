import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Faq = () => {
    const [expandedQuestions, setExpandedQuestions] = useState({});

    const faqs = [
        {
            id: "questionOne",
            question: "What is Ayurvedic eye care?",
            answer:
                "Ayurvedic eye care is a holistic approach to maintaining and improving eye health using principles from Ayurveda, an ancient Indian system of medicine. It involves natural remedies, dietary recommendations, eye exercises, and lifestyle practices to promote healthy vision.",
        },
        {
            id: "questionTwo",
            question: "Can Ayurveda help with common eye issues?",
            answer:
                "Yes, Ayurveda offers solutions for common eye issues such as dry eyes, eye strain, and redness. Ayurvedic treatments may include herbal eye drops, eye exercises, and dietary changes to alleviate these problems.",
        },
        {
            id: "questionThree",
            question: "Are there Ayurvedic remedies for improving eyesight?",
            answer:
                "Ayurveda provides techniques to improve eyesight naturally. These may include the use of herbal formulations, regular eye exercises, and maintaining a balanced diet rich in eye-friendly nutrients.",
        },
        {
            id: "questionFour",
            question: "How can I reduce eye strain with Ayurvedic practices?",
            answer:
                "Ayurveda recommends practices like Palming exercises, Trataka meditation, and using herbal eye drops to reduce eye strain caused by prolonged screen time or reading. These techniques help relax the eye muscles and relieve strain.",
        },
        {
            id: "questionFive",
            question:
                "What dietary recommendations does Ayurveda suggest for eye health?",
            answer:
                "Ayurveda emphasizes a diet rich in vitamin A, vitamin C, and antioxidants to support eye health. Foods like carrots, Indian gooseberries (Amla), spinach, and almonds are considered beneficial for the eyes.",
        },
        {
            id: "questionSix",
            question: "Is it necessary to consult an Ayurvedic eye doctor?",
            answer:
                "While Ayurvedic remedies can be helpful, it's essential to consult with a qualified Ayurvedic eye doctor or practitioner before starting any treatment, especially for serious eye conditions. They can provide personalized guidance based on your specific needs.",
        },
    ];

    const toggleQuestion = (questionId) => {
        setExpandedQuestions((prevState) => ({
            ...prevState,
            [questionId]: !prevState[questionId],
        }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Frequently Asked Questions</Text>
            {faqs.map((faq) => (
                <TouchableOpacity
                    key={faq.id}
                    style={styles.questionContainer}
                    onPress={() => toggleQuestion(faq.id)}
                >
                    <Text style={styles.question}>{faq.question}</Text>
                    {expandedQuestions[faq.id] && (
                        <Text style={styles.answer}>{faq.answer}</Text>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 16,
        marginBottom:80
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    questionContainer: {
        marginBottom: 16,
    },
    question: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    answer: {
        fontSize: 14,
    },
});

export default Faq;
