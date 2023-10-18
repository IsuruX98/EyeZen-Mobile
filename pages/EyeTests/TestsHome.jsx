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
  { path: "*", name: "Contrast Sensitivity" },
  { path: "*", name: "Depth Precision" },
  { path: "MacularDegeneration", name: "Macular Degeneration" },
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius id
            inventore repudiandae, ad nam mollitia expedita a maxime! Mollitia
            rerum, officiis soluta labore, tempore quasi deleniti id rem,
            similique ratione quisquam. Rerum ab, repellat accusamus commodi
            totam voluptates iusto unde voluptatum iure, necessitatibus eveniet
            odit ipsum ullam tempora inventore. Sequi?
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
    paddingHorizontal: 16,
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
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1.5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    flexBasis: "48%", // You can adjust this value to control button width
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
});

export default TestsHome;
