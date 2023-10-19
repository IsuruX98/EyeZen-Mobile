import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Amsler from "../../../assets/eyetests/Amsler.jpg";

const MacularTest = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Amsler Grid Test</Text>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>To perform this Test:</Text>
          <View>
            <Text style={styles.instructionList}>
              1. Make sure you are in a well-lit room. In the case that you wear
              glasses, have them on for the assessment.
            </Text>
            <Text style={styles.instructionList}>
              2. Position your eyes 12-14 inches away from the Amsler Grid.
            </Text>
            <Text style={styles.instructionList}>
              3. Cover one eye, and with the open eye, focus on the black dot in
              the center of the grid.
            </Text>
            <Text style={styles.instructionList}>
              4. While looking directly at the center dot, notice in your side
              vision if all grid lines look straight or if any lines or areas
              look blurry, wavy, dark, or blank.
            </Text>
            <Text style={styles.instructionList}>
              5. Follow the same steps with the other eye.
            </Text>
          </View>
        </View>
        <Image source={Amsler} style={styles.image} />
        <Text style={styles.resultText}>
          If you notice any areas of the grid that appear darker, wavy, blank,
          or blurry, contact your ophthalmologist right away. They will check to
          see what's going on.
        </Text>
        <Text style={styles.disclaimer}>
          The tests that we propose do not have a medical value, and we remind
          you that only your optometrist can give a proper diagnosis.
        </Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("DoctorList")}>
              <Text style={styles.buttonText}>Book an Appoinment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("TestsHome")}>
              <Text style={styles.buttonText}>Try Another Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    color: "blue",
    textTransform: "uppercase",
  },
  instructionsContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  instructionTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  instructionList: {
    fontSize: 20,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 16,
  },
  resultText: {
    fontSize: 20,
    marginVertical: 10,
  },
  disclaimer: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  button: {
    flexBasis: "48%",
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "#004AAD",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
};

export default MacularTest;
