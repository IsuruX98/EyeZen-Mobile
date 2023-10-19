import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "../../apis/axios";
import { Picker } from "@react-native-picker/picker";

const CreateQuizQuestion = ({ navigation }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ]);

  const handleAnswerChange = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].answer = answer;
    setAnswers(updatedAnswers);
  };

  const handleIsCorrectChange = (index, isCorrect) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].isCorrect = isCorrect;
    setAnswers(updatedAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { answer: "", isCorrect: false }]);
  };

  const handleRemoveAnswer = (index) => {
    if (answers.length > 2) {
      const updatedAnswers = [...answers];
      updatedAnswers.splice(index, 1);
      setAnswers(updatedAnswers);
    } else {
      Alert.alert("Oops...", "Minimum two answers required");
    }
  };

  const handleSubmit = async () => {
    // Validate the question and answers here if needed
    if (
      !question ||
      answers.length < 2 ||
      !answers.some((answer) => answer.isCorrect)
    ) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid question and answers."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("infantQuiz", {
        question: question,
        answers: answers,
      });

      if (response.data.status === "ok") {
        // Quiz question successfully created
        setLoading(false);
        Alert.alert("Success!", "Quiz question added successfully!", [
          { text: "OK" },
        ]);
        setQuestion("");
        setAnswers([
          { answer: "", isCorrect: false },
          { answer: "", isCorrect: false },
        ]);
      } else {
        setLoading(false);
        // Handle API error response here
        Alert.alert(
          "Error",
          "Failed to create quiz question. Please try again later."
        );
      }
    } catch (error) {
      // Handle network error or other exceptions here
      setLoading(false);
      console.error("Error creating quiz question:", error);
      Alert.alert(
        "Error",
        "An error occurred while creating the quiz question."
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingTop: 80 }}></View>
      <Text style={styles.heading}>Create Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your question"
        value={question}
        onChangeText={(text) => setQuestion(text)}
      />
      {answers.map((answer, index) => (
        <View key={index} style={styles.answerContainer}>
          <TextInput
            style={styles.answerInput}
            placeholder={`Option ${index + 1}`}
            value={answer.answer}
            onChangeText={(text) => handleAnswerChange(index, text)}
          />
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleIsCorrectChange(index, !answer.isCorrect)}
          >
            <Text>Correct</Text>
            <View style={styles.checkbox}>
              {answer.isCorrect && <View style={styles.checkedCircle} />}
            </View>
          </TouchableOpacity>
          {answers.length > 2 && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveAnswer(index)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddAnswer}>
        <Text style={styles.addButtonText}>Add Answer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Question</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#004AAD",
    fontWeight: "900",
    fontSize: 40,
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  answerInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    marginTop: -14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "black",
  },
  removeButton: {
    marginTop: -14,
    marginLeft: "auto",
  },
  removeButtonText: {
    color: "red",
    fontWeight: "bold",
  },
  addButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#004AAD",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  submitButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#333333",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CreateQuizQuestion;
