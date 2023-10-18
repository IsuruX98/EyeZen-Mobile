import React, { useState, useEffect } from "react";
import { View, Text, Button as RNButton, StyleSheet } from "react-native";
import Questions from "./Questions";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const QuestionPage = () => {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [allquestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllQuiz = async () => {
      try {
        const response = await axios.get("mainQuiz");
        setAllQuestions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };
    getAllQuiz();
  }, []);

  const getFinalPercentage = (finalPercentage) => {
    setFinalPercentage(finalPercentage);
  };

  // Event handler for next button
  const onNext = () => {
    if (currentIndex < allquestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("MainQuizResults", { finalPercentage });
    }
  };

  // Event handler for prev button
  const onPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Exit button
  const onExitBtn = () => {
    // Implement your exit logic here
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <>
          <View>
            <Text style={styles.header}>{`Question ${currentIndex + 1} out of ${
              allquestions.length
            }`}</Text>
          </View>
          <Questions
            num={currentIndex}
            onFinalPercentage={getFinalPercentage}
            data={allquestions}
            next={onNext}
          />
          <View style={styles.hr} />
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <RNButton title="Prev" onPress={onPrev} />
            </View>
            <View style={styles.buttonWrapper}>
              <RNButton title="Exit" color="red" onPress={onExitBtn} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
  },
  hr: {
    height: 1,
    backgroundColor: "gray",
    opacity: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default QuestionPage;
