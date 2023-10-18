import React, { useState, useEffect } from "react";
import {View, Text, Button, TouchableOpacity, StyleSheet} from "react-native";
import axios from "../apis/axios";


const FarSightedTest = ({ navigation }) => {
    const [words, setWords] = useState([]);
    const[count, setCount] = useState(0);
    const[currentIndex, setCurrentIndex] = useState(0)
    const[length, setLength] = useState(words.length)
    const [fontSizes, setFontSizes] = useState([20, 18, 16, 14, 12]);
    const[notClearCount, setNotClearCount] = useState(0);


    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = () => {
        axios.get('word')
            .then(response => {
                setWords(response.data);
            })
            .catch(error => {
                console.error('Error fetching words:', error);
            });
    };

    const moveToNextWord = () => {
        if (count !== 6) {
            setCount(count + 1)
            setCurrentIndex(currentIndex + 1)
        } else {

            navigation.navigate("ResultPage");
        }
    };

    const notclear = () => {
        if(notClearCount != 2){
            setNotClearCount(notClearCount + 1);
            setCurrentIndex(currentIndex + 1)
        }
        else{
            navigation.navigate("FarSightedResultFail");
        }
    }



    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{flex:1, paddingTop:400}}>
                {words.length > 0 ? <Text style={{ fontSize: fontSizes[count] || fontSizes[fontSizes.length - 1] }}>{words[currentIndex].word}</Text> : null}

            </View>
            <View style={{paddingBottom: 50}}>
                <TouchableOpacity style={styles.button1}
                                  onPress={() => {
                                      moveToNextWord()
                                  }}
                >
                    <Text style={styles.buttonText} >Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2}
                                  onPress={() => {
                                      notclear()
                                  }}
                >
                    <Text style={styles.buttonText} >Not Clear</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};


export default FarSightedTest;


const styles = StyleSheet.create({

    button1: {
        backgroundColor: "#004AAD",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 150,
        borderRadius: 5,



    },
    buttonText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign:"center"
    },

    button2: {
        backgroundColor: "#ce3900",
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderRadius: 5
    }

    });
