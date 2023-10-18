import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Data from "../assets/data";

const renderStepperData = ({ item, index }) => (
  <View style={styles.faqItemContainer}>
    <TouchableOpacity
      style={styles.faqQuestionContainer}
      onPress={() => setActiveIndex(index === activeIndex ? null : index)}
    >
      <Text style={styles.faqQuestion}>{item.question}</Text>
      <Text style={styles.faqIcon}>{activeIndex === index ? "▼" : "▶"}</Text>
    </TouchableOpacity>
    {activeIndex === index && (
      <Text style={styles.faqAnswer}>{item.answer}</Text>
    )}
  </View>
);

const MainQuizHome = () => {
  const navigation = useNavigation();
  const quizDetails = Data;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Take the Quick
        <Text style={styles.accentText}>Online Suitability Quiz</Text>
      </Text>

      <Text style={styles.description}>
        Welcome to the Vision Test, a comprehensive assessment designed to
        evaluate your visual acuity and detect common vision problems. This test
        aims to provide you with valuable insights into your eye health. It's a
        simple yet effective way to gauge your vision and identify potential
        issues that may require further attention...
      </Text>

      <View style={styles.stepperContainer}></View>

      <Text style={styles.bottomText}>
        Thank you for choosing our Vision Test. Let's get started on the journey
        to better eye health!
      </Text>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("MainQuestions")}
      >
        <Text style={styles.startButtonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  accentText: {
    color: "#004AAD",
  },
  description: {
    marginTop: 16,
    textAlign: "center",
  },
  stepperContainer: {
    // Styles for your StepperComponent container
  },
  bottomText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  startButton: {
    backgroundColor: "#004AAD",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  startButtonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default MainQuizHome;
