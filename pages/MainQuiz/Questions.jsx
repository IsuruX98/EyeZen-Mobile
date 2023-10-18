import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Questions = (props) => {
  const questions = props.data;

  const [checkedOptions, setCheckedOptions] = useState(
    Array(questions.length).fill(false)
  );

  const [input, setInput] = useState([]);

  const answers = questions.map((item) => item.answer);
  let correctCount = 0;

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

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginTop: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default Questions;
