import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Ishihara from "../../assets/eyetests/Ishihara_00.png";

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
    paddingTop:100
  },
  gridContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  header: {
    fontWeight:"900",
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
    height: "120%",
    aspectRatio: 1.5,
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

export default ColorBlind;
