import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "../../apis/axios";
import { Picker } from "@react-native-picker/picker";

const CreateMainQuestions = () => {
  const navigation = useNavigation();

  const [disease, setDisease] = useState();
  const [questions, setQuestion] = useState("");
  const [Option1, setOption1] = useState("");
  const [Option2, setOption2] = useState("");
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  // Send data to the database
  const handleSubmit = async () => {
    const newOptions = [Option1, Option2];
    const answer = isEnabled1 ? Option1 : isEnabled2 ? Option2 : "empty";

    if (!disease || !Option1 || !Option2 || !questions || !answer) {
      Alert.alert("Error!", "Fill in all the fields!");
      return;
    }
    if (answer === "empty") {
      Alert.alert("Error!", "Please Select the Correct Answer!");
      return;
    }
    if (isEnabled1 && isEnabled2) {
      Alert.alert("Error!", "Please Select only one Correct Answer!");
      return;
    }
    console.log(disease, answer, Option1, Option2, questions);
    try {
      const response = await axios.post("mainQuiz", {
        questions,
        options: newOptions,
        answer,
        disease,
      });
      if (response.status === 200) {
        navigation.navigate("ViewMainQuestions");
        Alert.alert("Success!", "Question Saved Successfully!");
      } else {
        Alert.alert("Error!", "Failed to save the question");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error!", "An error occurred while saving the question.");
    }
  };

  const handeleCancel = () => {
    Alert.alert("Cancel", "Are Your Sure You want to Cancel? ", [
      { text: "Yes", onPress: () => navigation.navigate("Admin") },
      { text: "No", style: "cancel" },
    ]);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Create Question</Text>
        </View>

        <TextInput
          style={styles.textarea}
          multiline
          placeholder="Add a Question"
          onChangeText={(text) => setQuestion(text)}
        />
        <Picker
          itemStyle={styles.picker}
          selectedValue={disease}
          onValueChange={(itemValue, itemIndex) => setDisease(itemValue)}
        >
          <Picker.Item label="--Select a Disease--" value="" color="red" />
          <Picker.Item label="Nearsightedness" value="Nearsightedness" />
          <Picker.Item label="Farsightedness" value="Farsightedness" />
          <Picker.Item label="Color Blindness" value="Color Blindness" />
          <Picker.Item
            label="Contrast Sensitvity"
            value="Contrast Sensitvity"
          />
          <Picker.Item label="Depth Precision" value="Depth Precision" />
          <Picker.Item
            label="Macular Degeneration"
            value="Macular Degeneration"
          />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Option1"
          onChangeText={(text) => setOption1(text)}
        />
        <View style={styles.switchBtnContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "green" }}
            thumbColor={isEnabled1 ? "black" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
            style={styles.switch}
            disabled={isEnabled2}
          />
          <Text
            style={[
              styles.switchBtnText,
              isEnabled1 ? styles.enable : styles.disable,
            ]}
          >
            {isEnabled1 ? "This is the Answer" : "This is the wrong Answer"}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Option2"
          onChangeText={(text) => setOption2(text)}
        />
        <View style={styles.switchBtnContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "green" }}
            thumbColor={isEnabled2 ? "black" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
            style={styles.switch}
            disabled={isEnabled1}
          />
          <Text
            style={[
              styles.switchBtnText,
              isEnabled2 ? styles.enable : styles.disable,
            ]}
          >
            {isEnabled2 ? "This is the Answer" : "This is the wrong Answer"}
          </Text>
        </View>
        <Text style={styles.switchBtnText}></Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handeleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },

  switch: {
    marginBottom: 10,
    width: 50,
  },
  picker: {
    fontSize: 20,
  },
  switchBtnContainer: {
    flexDirection: "row",
    gap: 15,
  },
  switchBtnText: {
    fontSize: 20,
  },
  enable: {
    color: "green",
  },
  disable: {
    color: "red",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#004AAD",
    marginBottom: 20,
  },
  textarea: {
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CreateMainQuestions;
