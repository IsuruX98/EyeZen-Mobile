import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import doctorContactImage from "../assets/ayurvrdic/doctorcontact.png";
import { useNavigation } from "@react-navigation/native";

const DoctorContact = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Doctor Contact</Text>
        <Text style={styles.description}>In this section</Text>
        <Text style={styles.paragraph}>
          Discover the perfect eye care specialist here! Explore our list of
          trusted doctors, view their profiles for expertise and patient
          reviews, and find their locations on our convenient map. Your journey
          to healthier vision begins now.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("DoctorList");
            }}
          >
            <Text style={styles.buttonText}>Doctor List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <Text style={styles.buttonText}>View Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={doctorContactImage}
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
    paddingHorizontal: 130,
    borderRadius: 5,
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

export default DoctorContact;
