import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colorblind from "../../../assets/eyetests/ColorBlindTestNew.png";
const ColorBlindTest = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Ishihara test</Text>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>To perform this Test:</Text>
          <View>
            <Text style={styles.instructionList}>
              1. Sit about three feet away from your mobile screen
            </Text>
            <Text style={styles.instructionList}>
              2. Look at each of the circles below, what do you see?
            </Text>
            <Text style={styles.instructionList}>
              3. Check Your Results with the below results
            </Text>
          </View>
        </View>
        <Image source={colorblind} style={styles.image} resizeMode="contain" />
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results:</Text>
          <Text style={styles.instructionList}>Upper Row: 23, 36, 9</Text>
          <Text style={styles.instructionList}>Below Row: 4, 48, 15</Text>
          <Text style={styles.resultBottom}>
            If you are unable to see these, you definitely have a vision
            problem.
          </Text>
        </View>
        <Text style={styles.disclaimer}>
          The tests that we propose do not have a medical value, and we remind
          you that only your optometrist can give a proper diagnostic.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    color: "#004AAD",
    textTransform: "uppercase",
  },
  instructionsContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  instructionTitle: {
    fontSize: 24,
  },
  instructionList: {
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 250,
    marginVertical: 16,
    aspectRatio: 1.5,
  },
  resultsContainer: {
    marginVertical: 10,
  },
  resultsTitle: {
    fontSize: 24,
    marginBottom: 10,
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
  resultBottom: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default ColorBlindTest;
