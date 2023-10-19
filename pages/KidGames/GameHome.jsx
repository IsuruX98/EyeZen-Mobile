import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Kid from "../../assets/games/Kid.png";
import Color from "../../assets/games/Color.png";

const ColorBlind = require("../../assets/eyetests/Ishihara_09.png");
const ColorMatch = require("../../assets/eyetests/colormatch.png");

const games = [
  {
    imageSource: ColorMatch,
    altText: "Color Match",
    title: "Color Match",
    highestScore: 4200,
    path: "*",
  },
  {
    imageSource: ColorBlind,
    altText: "color blind",
    title: "Color Vision",
    highestScore: 4200,
    path: "*",
  },
  {
    imageSource: Color,
    altText: "Color Cubes",
    title: "Color Cubes",
    highestScore: 4200,
    path: "*",
  },
];

const GameHome = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Games for Kids</Text>
          <Text style={styles.subtitle}>In this section...</Text>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("ColorVisionGame")}
            style={styles.buttonContainer}
          ></TouchableOpacity> */}
        </View>
        <Image source={Kid} style={styles.image} />

        <View style={styles.gamesContainer}>
          {games.map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(value.path)}
              style={styles.gameContainer}
            >
              <View style={styles.gameCard}>
                <View style={styles.imageContainer}>
                  <Image source={value.imageSource} style={styles.gameImage} />
                </View>
                <View style={styles.gameInfoContainer}>
                  <Text style={styles.gameTitle}>{value.title}</Text>
                  <Text style={styles.gameDescription}>
                    {value.description}
                  </Text>
                  <Text style={styles.highestScore}>
                    Highest Score: {value.highestScore}
                  </Text>
                </View>
              </View>
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
    paddingHorizontal: 40,
    paddingTop: 80,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 40,
    fontWeight: "900",
    color: "#004AAD",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
  },
  image: {
    flex: 1,
    height: 200,
    width: "100%",
    marginBottom: 15,
    marginTop: 15,
  },
  gamesContainer: {
    flex: 1,
    flexDirection: "column",
  },
  gameContainer: {
    width: "100%",
    marginBottom: 10,
  },
  gameCard: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: "row",
  },
  imageContainer: {
    width: 100,
    height: 100,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  gameImage: {
    width: "100%",
    height: "100%",
  },
  gameInfoContainer: {
    flex: 1,
    padding: 15,
  },
  gameTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  gameDescription: {
    textAlign: "center",
  },
  highestScore: {
    textAlign: "right",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default GameHome;
