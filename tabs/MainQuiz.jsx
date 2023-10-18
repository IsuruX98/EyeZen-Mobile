import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Data from "../assets/data";
import ayurvedicsections from "../assets/quiz/mainquizHome.jpg";
import { SafeAreaView } from "react-native-safe-area-context";

const MainQuizHome = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigation = useNavigation();
  const quizDetails = Data;

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quizDetails}
        renderItem={renderStepperData}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Text style={styles.header}>Eye Checkup Quiz</Text>
              <Text style={styles.title}>Take the Quick Online</Text>
              <Text style={[styles.accentText, styles.title]}>
                Suitability Quiz
              </Text>

              <Text style={styles.description}>
                Welcome to the Vision Test, a comprehensive assessment designed
                to evaluate your visual acuity and detect common vision
                problems. This test aims to provide you with valuable insights
                into your eye health. It's a simple yet effective way to gauge
                your vision and identify potential issues that may require
                further attention...
              </Text>

              {/* <Text style={styles.bottomText}>
                Thank you for choosing our Vision Test. Let's get started on the
                journey to better eye health!
              </Text> */}

              <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate("MainQuestions")}
              >
                <Text style={styles.startButtonText}>Start Quiz</Text>
              </TouchableOpacity>

              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={ayurvedicsections}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.subHeaderText2}>FAQ section</Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 40,
    fontWeight: "900",
    color: "#004AAD",
    textAlign: "center",
    marginBottom: 10,
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
  faqContainer: {
    marginVertical: 10,
    paddingBottom: 120,
  },
  subHeaderText2: {
    paddingLeft: 5,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
  },
  faqItemContainer: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingVertical: 10,
    flex: 1,
    padding: 19,
    borderRadius: "10%",
  },

  faqQuestionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: "bold",
  },
  faqIcon: {
    fontSize: 18,
    color: "#336dec",
  },
  faqAnswer: {
    marginTop: 10,
    color: "#777",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "90%",
    borderRadius: 20,
    aspectRatio: 1.5,
  },
});

export default MainQuizHome;
