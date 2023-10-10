import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import hero from "../assets/home.png";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>See Clearly,</Text>
        <Text style={styles.subHeader}>Live Vibrantly</Text>
        <Text style={styles.description}>
          Unlock a World of Visual Wellness
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle button press logic here
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={hero} resizeMode="contain" />
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
    fontSize: 50,
    fontWeight: "900",
  },
  subHeader: {
    fontSize: 40,
    fontWeight: "900",
    color: "#004AAD",
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#004AAD",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 650,
    height: "100%",
    borderRadius: 20,
  },
});

export default Home;
