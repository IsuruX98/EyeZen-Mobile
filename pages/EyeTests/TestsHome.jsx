import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import EyeCheck from "../../assets/eyetests/doctor-testing-patient-eyesight.jpg";

const diseases = [
  { path: "NearSighted", name: "Myopia" },
  { path: "FarSighted", name: "Far-sighted" },
  { path: "ColorBlind", name: "Color Blindness" },
  { path: "MacularDegeneration", name: "Macular Degeneration" },
  { path: "*", name: "Contrast Sensitivity" },
  { path: "*", name: "Depth Precision" },

];

const TestsHome = ({ navigation }) => {
  const checkPhoto = EyeCheck;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Tests for Eye Diseases</Text>
          <Text style={styles.description}>In this section...</Text>
          <Text style={styles.paragraph}>
            Experience hassle-free eye health assessments with our intuitive mobile app. Detect common eye issues and diseases effortlessly from your smartphone. Quick, accurate, and user-friendly tests ensure you stay on top of your eye health. Your vision matters – start your test today!
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={checkPhoto} style={styles.image} />
        </View>

        <View style={styles.buttonContainer}>
          {diseases.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => {
                navigation.navigate(value.path);
              }}
            >
              <Text style={styles.buttonText}>{value.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  headerContainer: {
    fontSize: 40,
    fontWeight: "900",
    color: "#004AAD",
  },
  header: {
    fontSize: 40,
    fontWeight: "900",
    color: "#004AAD",
    textAlign: "center",
  },
  headerBold: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal:15
  },
  imageContainer: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal:15
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius:20,
    aspectRatio: 1.5,
  },
  buttonContainer: {
    paddingTop:10,
    paddingBottom:40,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "center",
    marginTop: 15,
    width: "95%",
    backgroundColor: "#004AAD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TestsHome;
