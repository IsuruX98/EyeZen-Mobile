import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import TestHome from "../assets/testHome.jpg";

const TestsAndGames = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Tests And Games</Text>
        <Text style={styles.description}>In this section</Text>
        <Text style={styles.paragraph}>
          Discover a world of interactive tests and engaging games designed to
          enhance your eye health and visual acuity. Whether you're looking to
          assess your vision, improve eye coordination, or simply have fun while
          caring for your eyes, our diverse range of tests and games offers the
          ideal solutions for all ages. From comprehensive vision tests to
          entertaining eye exercises, explore our collection and embark on a
          journey to nurture and enhance your vision.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("TestsHome");
            }}
          >
            <Text style={styles.buttonText}>Eye Checkup Tests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("TestsHome");
            }}
          >
            <Text style={styles.buttonText}>Games For Kids</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={TestHome} resizeMode="contain" />
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

export default TestsAndGames;
