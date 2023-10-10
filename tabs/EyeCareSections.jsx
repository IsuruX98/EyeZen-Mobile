import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ayurvedicsections from "../assets/ayurvrdic/ayurvedicsections.png";

const EyeCareSections = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Eye Care Sections</Text>
        <Text style={styles.description}>In this section</Text>
        <Text style={styles.paragraph}>
          Explore specialized eye care services tailored for different needs.
          From Ayurvedic remedies for holistic vision wellness to specialized
          infant eye care designed for the youngest members of your family, find
          the perfect solutions to nurture your vision.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AyurvedicEyeCareHome");
            }}
          >
            <Text style={styles.buttonText}>Ayurvedic Eye Care</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // navigation.navigate("DoctorMap");
            }}
          >
            <Text style={styles.buttonText}>Infant Eye Care</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={ayurvedicsections}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
    justifyContent: "space-around",
  },
  textContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "900",
    color: "#004AAD",
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#004AAD",
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "90%",
    borderRadius: 20,
  },
});

export default EyeCareSections;
