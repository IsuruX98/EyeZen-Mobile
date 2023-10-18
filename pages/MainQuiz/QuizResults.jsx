import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import Button from "../../components/Button";
// import ColorBlind from "./ColorBlind"; // Import your ColorBlind component
// import NearSighted from "./NearSighted"; // Import your NearSighted component
// import MacularDegeneration from "./MacularDegeneration"; // Import your MacularDegeneration component
// import ContrastSensitivity from "./ContrastSensitivity"; // Import your ContrastSensitivity component
import Pass from "../../assets/sigthted-test/pass.png";
import Fail from "../../assets/sigthted-test/fail.png";

const QuizResults = () => {
  const route = useRoute();
  const { finalPercentage } = route.params;
  const navigation = useNavigation();
  const generatePDF = () => {
    // Implement your PDF generation logic if needed
    // You can use third-party libraries like react-native-pdf
    // to generate PDF documents in React Native.
  };

  const openDoctorContact = () => {
    navigation.navigate("DoctorList"); // Navigate to the doctor contact screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.resultText}>Your Results</Text>
        <Text style={styles.scoreText}>Score Obtained: {finalPercentage}%</Text>

        {/* Vision Condition */}
        <Text style={styles.conditionText}>Vision Condition</Text>
        {finalPercentage <= 100 && finalPercentage >= 90 ? (
          // Condition for high percentage
          <Text style={styles.goodConditionText}>
            Vision is great! Use our eye care section to keep your eyes healthy.
          </Text>
        ) : finalPercentage < 90 && finalPercentage >= 80 ? (
          // Condition for good percentage
          <Text style={styles.goodConditionText}>
            Vision is good! Use our eye care section to maintain eye health and
            check possible diseases with tests.
          </Text>
        ) : finalPercentage < 80 && finalPercentage >= 60 ? (
          // Condition for average percentage
          <Text style={styles.goodConditionText}>
            Vision is good! Use our advice section to keep your eyes healthy and
            check possible diseases with tests.
          </Text>
        ) : finalPercentage < 60 && finalPercentage >= 50 ? (
          // Condition for lower percentage
          <Text style={styles.poorConditionText}>
            Vision seems a bit worse. We recommend meeting an Ophthalmologist
            and checking possible diseases with tests.
          </Text>
        ) : (
          // Condition for very low percentage
          <Text style={styles.poorConditionText}>
            Vision is worse. We highly recommend meeting an Ophthalmologist and
            checking possible diseases with tests.
          </Text>
        )}

        {/* Possible Diseases */}
        {/* <Text style={styles.diseasesText}>Possible Diseases</Text>
          <TouchableOpacity onPress={() => navigation.navigate("ColorBlind")}>
            <Text style={styles.diseaseLink}>Color Blind: 85%</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("NearSighted")}>
            <Text style={styles.diseaseLink}>Myopia: 55%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MacularDegeneration")}
          >
            <Text style={styles.diseaseLink}>Macular Degeneration: 25%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ContrastSensitivity")}
          >
            <Text style={styles.diseaseLink}>Contrast Sensitivity: 10%</Text>
          </TouchableOpacity>
          <Text style={styles.diseaseNote}>
            Click on a disease to confirm with a test
          </Text> */}
        {/* Display Pass or Fail Image */}
        {finalPercentage > 50 ? (
          <Image
            style={styles.resultImage}
            source={Pass}
            resizeMode="contain"
          />
        ) : (
          <Image
            style={styles.resultImage}
            source={Fail}
            resizeMode="contain"
          />
        )}
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={generatePDF}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Print Results</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openDoctorContact}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Book an Appointment</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EyeZen")}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back To Home</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    justifyContent: "space-around",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
  },
  resultText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  scoreText: {
    fontSize: 30,
    textAlign: "center",
    color: "#004AAD",
    marginTop: 10,
  },
  conditionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  goodConditionText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 10,
    color: "green",
  },
  poorConditionText: {
    fontSize: 20,
    color: "red",
    marginLeft: 20,
    marginTop: 10,
  },
  diseasesText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  diseaseLink: {
    fontSize: 16,
    color: "blue",
    marginLeft: 20,
    marginTop: 10,
  },
  diseaseNote: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#004AAD",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultImage: {
    width: "100%",
    height: "40%",
    aspectRatio: 1.5,
    alignSelf: "center",
  },
});

export default QuizResults;
