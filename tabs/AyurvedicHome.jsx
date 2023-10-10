import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Faq from "../components/Faq";
import doctorContactImage from "../assets/ayurvrdic/doctorcontact.png";

const AyurvedicHome = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Ayurvedic Eye Care</Text>
        <Text style={styles.description}>
          In this section, discover natural solutions to maintain healthy eyes.
          Explore Ayurvedic treatments for common eye issues, learn
          eye-strengthening exercises, and access video tutorials. Find contact
          information for trusted Ayurvedic eye doctors and read testimonials
          from those who've benefited. Please remember that the information is
          for educational purposes and consult with a professional before trying
          any treatments.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={doctorContactImage}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Handle button click
        }}
      >
        <Text style={styles.buttonText}>Explore Ayurvedic Eye Care</Text>
      </TouchableOpacity>
      <Faq />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 80,
  },
  textContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: 35,
    fontWeight: "900",
    color: "#004AAD",
    paddingBottom: 30,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004AAD",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 600,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#004AAD",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AyurvedicHome;
