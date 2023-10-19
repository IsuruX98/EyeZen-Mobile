import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Macular from "../../assets/eyetests/macular.jpg";

const MacularDegeneration = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>
              <Text style={styles.headerColored}>
                Macular Degeneration Test{" "}
              </Text>
            </Text>
            <Text style={styles.paragraph}>
              Macular degeneration is an eye disease that affects central
              vision. This means that people with macular degeneration can't see
              things directly in front of them. This common age-related eye
              condition mostly occurs in people over the age of 50. To detect
              this we will use Amsler grid. The basic Amsler grid is a
              10-centimeter by 10-centimeter square filled with evenly spaced
              straight lines in a grid pattern. The lines form very small
              squares that measure 5 millimeters on each side. There's a dot to
              mark the center. The basic grid is typically black lines on a
              white background, but variations exist.
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={Macular} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("MacularDegenerationTest");
            }}
          >
            <Text style={styles.buttonText}>Start Test</Text>
          </TouchableOpacity>
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
  gridContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  header: {
    fontSize: 40,
    textAlign: "center",
  },
  headerColored: {
    color: "#004AAD",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1.5,
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
});

export default MacularDegeneration;
