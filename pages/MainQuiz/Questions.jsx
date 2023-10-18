import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Questions = (props) => {
  const questions = props.data;

  const [checkedOptions, setCheckedOptions] = useState(
    Array(questions.length).fill(false)
  );

  //get input ansers
  const [input, setInput] = useState([]);

  //predefine answer array
  const answers = questions.map((item) => item.answer);
  let correctCount = 0;

  //generate final score
  answers.forEach((value, index) => {
    if (value === input[index]) {
      correctCount = correctCount + 1;
    }
  });

  const finalPercentage = (correctCount / answers.length) * 100;

  const selectBtn = (value, index) => {
    const updatedValues = [...input];
    updatedValues[props.num] = value;

    setInput(updatedValues);

    const updatedCheckedOptions = [...checkedOptions];
    updatedCheckedOptions[props.num] = index;

    setCheckedOptions(updatedCheckedOptions);
    props.onFinalPercentage(finalPercentage);
    props.next();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{questions[props.num].questions}</Text>
      <View style={styles.buttonContainer}>
        {questions[props.num].options.map((value, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => selectBtn(value, index)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginTop: 16,
    textAlign: "center",
    height: 120,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    flexBasis: "48%", // You can adjust this value to control button width
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#004AAD",
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});

export default Questions;
