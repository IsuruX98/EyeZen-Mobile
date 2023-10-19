import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Axios from "../../apis/axios";
import { useFocusEffect } from "@react-navigation/native";

const ViewAllMainQuestions = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const response = await Axios.get("mainQuiz");
      console.log(response.data);
      setQuestions(response.data);
      setFilteredQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mainQuiz data:", error);
      Alert.alert("Error!", "Can not Get Main Questions");
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestions();
    }, [])
  );

  useEffect(() => {
    if (search) {
      const filteredQuestions = questions.filter((questions) => {
        return (
          questions.disease.toLowerCase().includes(search.toLowerCase()) ||
          questions.disease.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredQuestions(filteredQuestions);
    } else {
      setFilteredQuestions(questions);
    }
  }, [search, questions]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Video Tutorial",
      "Are you sure you want to delete this video tutorial?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            try {
              const res = Axios.delete(`mainQuiz/${id}`);
              if (res) {
                setQuestions((prevData) =>
                  prevData.filter((questions) => questions._id !== id)
                );
                Alert.alert("Success", "Question Deleted!");
              }
            } catch (error) {
              console.error("Error deleting Question:", error);
              Alert.alert("Error", "Cannot Delete Question!");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Main Quiz </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateMainQuestions")}
      >
        <Text style={styles.addButtonText}>Add Questions</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by disease"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <FlatList
        data={filteredQuestions}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View style={styles.questionCard}>
            <View>
              <Text>
                {index + 1} out of {questions.length}
              </Text>
              <Text style={styles.disease}>{item.disease}</Text>
              <Text style={styles.questionTitle}>{item.questions}</Text>
              <View style={styles.optionsContainer}>
                <Text style={styles.options}>Option 1 : {item.options[0]}</Text>
                <Text style={styles.options}>Option 2 : {item.options[1]}</Text>
              </View>
              <Text style={styles.answer}>Answer : {item.answer}</Text>
            </View>
            <View style={styles.buttonCard}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  navigation.navigate("UpdateAllQuestions", {
                    question: item,
                  });
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#004AAD",
    fontWeight: "900",
    fontSize: 40,
    paddingBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  questionCard: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 16,
  },

  questionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    width: 300,
  },
  disease: {
    fontSize: 20,
    marginBottom: 10,
    color: "red",
  },
  options: {
    paddingTop: 5,
    fontSize: 20,
    color: "#777",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  answer: {
    fontSize: 20,
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#004AAD",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: "#004AAD",
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonCard: {
    flexDirection: "row",
    gap: "50%",
  },
});

export default ViewAllMainQuestions;
