import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Ishihara from "../../assets/eyetests/Ishihara_00.jpg";

const ColorBlind = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>
              <Text style={styles.headerColored}>Color Blind Test </Text>
            </Text>
            <Text style={styles.paragraph}>
              Color blindness or color vision deficiency (CVD) is the decreased
              ability to see color or differences in color. It can impair tasks
              such as selecting ripe fruit, choosing clothing, and reading
              traffic lights. Color blindness may make some academic activities
              more difficult. To detect this, we will use the Ishihara Test. The
              Ishihara test is a color vision test for the detection of
              red-green color deficiencies. It was named after its designer,
              Shinobu Ishihara, a professor at the University of Tokyo, who
              first published his tests in 1917. The test consists of a number
              of Ishihara plates, which are a type of pseudoisochromatic plate.
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={Ishihara} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("ColorBlindTest");
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
    marginTop: 16,
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

export default ColorBlind;
