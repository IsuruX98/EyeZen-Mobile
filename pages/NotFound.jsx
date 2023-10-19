import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import Error from "../assets/404.png";

const NotFound = ({ navigation }) => {
  const notFoundImage = Error;

  return (
    <View style={styles.container}>
      <Image source={notFoundImage} style={styles.image} resizeMode="contain" />

      <Text style={styles.whoops}>Whoops!</Text>

      <Text style={styles.message}>
        The page you are looking for does not exist.
      </Text>

      <View style={styles.links}>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("EyeZen")}
        >
          <Text style={styles.linkText}>Home Page</Text>
        </TouchableOpacity>
        <Text style={styles.linkOr}>or</Text>
        <Text style={styles.linkText2}>Contact Us</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  whoops: {
    fontSize: 60,
    marginBottom: 16,
  },
  message: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  links: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  linkButton: {
    backgroundColor: "#004AAD",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  linkText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  linkText2: {
    color: "#004AAD",
    fontSize: 20,
    fontWeight: "bold",
  },
  linkOr: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default NotFound;
