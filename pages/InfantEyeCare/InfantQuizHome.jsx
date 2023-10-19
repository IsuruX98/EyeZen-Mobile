import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import axios from '../../apis/axios';

const InfantQuizHome = ({ navigation }) => {
    const [facts, setFacts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const images = [
        require('../../assets/infant/baby-vision1.jpg'),
        require('../../assets/infant/baby-vision2.jpg'),
        require('../../assets/infant/baby-vision3.jpg'),
    ];

    const faqData = [
        {
            question: "What is infant eye care?",
            answer:
                "Infant eye care involves taking care of your baby's eyes from birth to ensure their vision develops properly. Regular check-ups with a pediatric eye specialist can help detect and address any eye issues early on.",
        },
        {
            question: "When should I schedule my baby's first eye exam?",
            answer:
                "A baby's first eye exam is typically scheduled at around 6 months of age. However, if you notice any eye-related concerns earlier, it's important to consult with a pediatric eye doctor.",
        },
        {
            question: "How can I protect my baby's eyes?",
            answer:
                "To protect your baby's eyes, ensure they are shielded from direct sunlight, use baby-safe products for cleaning, and maintain proper hygiene. Regular check-ups and following your doctor's advice are also crucial.",
        },
    ];

    useEffect(() => {
        // Fetch data from the backend using axios
        axios.get('infantFact')
            .then(response => {
                setFacts(response.data);
            })
            .catch(error => {
                console.error('Error fetching facts:', error);
            });
    }, []);

    const renderFactItem = ({ item }) => (
        <View style={styles.factItemContainer}>
            <Text style={styles.factItemTitle}>{item.title}</Text>
            <Text style={styles.factItemDescription}>{item.description}</Text>
        </View>
    );

    const renderFAQItem = ({ item, index }) => (
        <View style={styles.faqItemContainer}>
            <TouchableOpacity
                style={styles.faqQuestionContainer}
                onPress={() => setActiveIndex(index === activeIndex ? null : index)}
            >
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqIcon}>{activeIndex === index ? '▼' : '▶'}</Text>
            </TouchableOpacity>
            {activeIndex === index && <Text style={styles.faqAnswer}>{item.answer}</Text>}
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={[
                { key: 'header' },
                { key: 'images', data: images },
                { key: 'facts', data: facts },
                { key: 'faq', data: faqData },
            ]}
            renderItem={({ item }) => {
                switch (item.key) {
                    case 'header':
                        return (
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Infant Eye Care</Text>
                                <Text style={styles.subHeaderText}>Keeping Your Baby's Eyes Bright and Healthy</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('InfantQuestionnaire')}
                                    style={styles.quizButton}
                                >
                                    <Text style={styles.quizButtonText}>Take the Quiz</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    case 'images':
                        return (
                            <View style={styles.imageContainer}>
                                <FlatList
                                    horizontal
                                    data={item.data}
                                    renderItem={({ item }) => <Image source={item} style={styles.image} />}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        );
                    case 'facts':
                        return (
                            <>
                                <Text style={styles.subHeaderText2}>Infant eye care tips</Text>
                                <FlatList
                                    data={item.data}
                                    renderItem={renderFactItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.factContainer}
                                />
                            </>

                        );
                    case 'faq':
                        return (
                            <>
                                <Text style={styles.subHeaderText2}>FAQ section</Text>
                                <FlatList
                                    data={item.data}
                                    renderItem={renderFAQItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.faqContainer}
                                />
                            </>

                        );
                    default:
                        return null;
                }
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 100,
        padding: 19,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 40,
        fontWeight: "900",
        color: "#004AAD",
    },
    subHeaderText: {
        paddingTop: 10,
        fontSize: 18,
    },
    subHeaderText2:{
        paddingLeft:5,
        fontSize: 25,
        fontWeight:'bold'
    },
    quizButton: {
        backgroundColor: '#004AAD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    quizButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        height: 300,
        width: 400,
        borderRadius: 20,
        marginVertical: 10,
    },
    factItemContainer: {
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
    },
    factItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004AAD',
        marginBottom: 8,
    },
    factItemDescription: {
        fontSize: 16,
        color: '#333',
    },
    faqItemContainer: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    faqQuestionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 18,
        color: '#333',
    },
    faqIcon: {
        fontSize: 20,
        color: '#333',
    },
    faqAnswer: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    imageContainer: {
        marginVertical: 10,
    },
    factContainer: {
        marginVertical: 10,
    },
    faqContainer: {
        marginVertical: 10,
        paddingBottom:120
    },
});

export default InfantQuizHome;
