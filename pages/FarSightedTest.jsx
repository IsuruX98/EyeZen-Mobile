import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Tts from 'react-native-tts';
import axios from 'axios';

const Speaker = require('../assets/profile.jpg');

const FarSightedTest = ({ navigation }) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [attempts, setAttempts] = useState({ success: 0, failure: 0 });
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [isHidden, setIsHidden] = useState(false);
    const [fontSizes] = useState([24, 18, 16, 12, 8]);
    const [currentFontSizeIndex, setCurrentFontSizeIndex] = useState(0);

    const predefinedText =
        'Please make sure to cover your one eye before starting the test by clicking the blue button below and do the test by saying the word';

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/word')
            .then((res) => {
                setWords(res.data);
                setLoading(false);
                setCurrentWordIndex(Math.floor(Math.random() * res.data.length));
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleSuccessfulAttempt = () => {
        if (attempts.success < 4) {
            setAttempts({ ...attempts, success: attempts.success + 1 });
            setCurrentFontSizeIndex((prevIndex) =>
                prevIndex < fontSizes.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else {
            navigation.navigate('EyeSightPass');
        }
    };

    const handleFailedAttempt = () => {
        navigation.navigate('EyeSightFail');
    };



    const handleSpeechRecognitionResult = () => {
        if (currentWordIndex !== null) {
            if (
                transcript.toLowerCase() === words[currentWordIndex].word.toLowerCase()
            ) {
                handleSuccessfulAttempt();
                if (attempts.success + 1 === 5) {
                    navigation.navigate('EyeSightPass');
                } else {
                    const newWordIndex = Math.floor(Math.random() * words.length);
                    setCurrentWordIndex(newWordIndex);
                }
            } else {
                handleFailedAttempt();
            }
        }
    };

    const startListeningAndUpdateData = () => {
        setIsHidden(true);
        handleSpeak(predefinedText);
    };

    const handleSpeak = (text) => {
        Tts.getInitStatus().then(() => {
            Tts.speak(text, { rate: 0.7 });
        });
    }



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={[
                    styles.button,
                    { visibility: isHidden ? 'hidden' : 'visible' },
                ]}
                onPress={startListeningAndUpdateData}
            >
                <Image source={Speaker} style={styles.image} />
                <Text style={[styles.text, { fontSize: fontSizes[currentFontSizeIndex] }]}>
                    Click here for Instructions
                </Text>
            </TouchableOpacity>
            {loading ? (
                <Text>Loading data...</Text>
            ) : (
                <View>
                    {currentWordIndex !== null && (
                        <View style={styles.wordContainer}>
                            <Text
                                style={[
                                    styles.word,
                                    {
                                        visibility: isHidden ? 'visible' : 'hidden',
                                        fontSize: fontSizes[currentFontSizeIndex],
                                    },
                                ]}
                            >
                                {words[currentWordIndex].word}
                            </Text>
                        </View>
                    )}
                </View>
            )}
            <View style={styles.buttonsContainer}>
                {/* Add your buttons and logic here */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#004AAD',
        padding: 10,
        borderRadius: 10,
        marginVertical: 24,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    wordContainer: {
        marginVertical: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    word: {
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default FarSightedTest;
