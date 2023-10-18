import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import Questions from "./Questions";
import { useNavigation } from "@react-navigation/native";
import axios from "../../apis/axios";

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
        console.log("error", err.message);
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
      Alert.alert("Submit", "Submit Your Answers", [
        {
          text: "Submit",
          onPress: () => {
            navigation.navigate("QuizResults", { finalPercentage });
          },
          isPreferred: true,
        },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  // Event handler for prev button
  const onPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      Alert.alert("You Cannot Go Back", "This is the First Question", [
        { text: "OK" },
      ]);
    }
  };

  // Exit button
  const onExitBtn = () => {
    Alert.alert("Are You Sure?", "Do You want to Exit From this Quiz?", [
      {
        text: "Yes",
        onPress: () => {
          navigation.navigate("QuizResults", { finalPercentage });
        },
      },
      { text: "No", style: "cancel" },
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <View>
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#004AAD"
            />
          </View>
        ) : (
          <>
            <View>
              <Text style={styles.header}>{`Question ${
                currentIndex + 1
              } out of ${allquestions.length}`}</Text>
            </View>
            <Questions
              num={currentIndex}
              onFinalPercentage={getFinalPercentage}
              data={allquestions}
              next={onNext}
            />
            <View style={styles.hr} />
            <View>
              {currentIndex + 1 === allquestions.length ? (
                <View style={styles.buttonContainer2}>
                  <TouchableOpacity onPress={onPrev} style={styles.button1}>
                    <Text style={styles.buttonText}>Prev</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <View>
                    <TouchableOpacity onPress={onPrev} style={styles.button1}>
                      <Text style={styles.buttonText}>Prev</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={onExitBtn}
                      style={[styles.button1, styles.button2]}
                    >
                      <Text style={styles.buttonText}>Exit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  hr: {
    height: 1,
    backgroundColor: "gray",
    opacity: 1,
    marginTop: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  buttonContainer2: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  button1: {
    flexBasis: "48%", // You can adjust this value to control button width
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#333333",
    padding: 10,
    width: 100,
  },
  button2: {
    backgroundColor: "red",
  },
  button3: {
    backgroundColor: "#004AAD",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 8,
  },
});

export default QuestionPage;
