import React, {useRef} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import hero from "../assets/home.png";
import Icon from "react-native-vector-icons/Ionicons";

const Home = () => {

  const scrollViewRef = useRef(null); // Create a ref for ScrollView

  const scrollToAboutUs = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 900, animated: true }); // Adjust the value based on your layout
    }
  };

  return (
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
        {/* Home Section */}
        <View style={styles.section1}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>See Clearly,</Text>
            <Text style={styles.subHeader}>Live Vibrantly</Text>
            <Text style={styles.description}>
              Unlock a World of Visual Wellness
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={scrollToAboutUs}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={hero}
                resizeMode="contain"
            />
          </View>
        </View>

        {/* About Us Section */}
        <View style={styles.section}>
          <Icon name="information-circle-outline" size={30} color="#004AAD" style={styles.icon} />
          <Text style={styles.sectionHeader}>About Us</Text>
          <Text style={styles.sectionContent}>
            We are EyeZen, your go-to destination for hassle-free eye care. Our team of professionals is dedicated to making your vision a priority. Simple, accessible, and tailored just for you. Welcome to a brighter world with EyeZen
          </Text>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Icon name="eye-outline" size={30} color="#004AAD" style={styles.icon} />
          <Text style={styles.sectionHeader}>Our Services</Text>
          <Text style={styles.sectionContent}>Eye Care Tests</Text>
          <Text style={styles.sectionContent}>Games for Vision Improvement</Text>
          <Text style={styles.sectionContent}>Ayurvedic Eye Care Section</Text>
          <Text style={styles.sectionContent}>Infant Eye Care Section</Text>
          <Text style={styles.sectionContent}>Contact a Doctor</Text>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Icon name="mail-outline" size={30} color="#004AAD" style={styles.icon} />
          <Text style={styles.sectionHeader}>Contact Us</Text>
          <Text style={styles.sectionContent}>Email: eyezen@gmail.com</Text>
          <Text style={styles.sectionContent}>Phone: +94 77-188-6641</Text>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 20,
  },
  section1: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    alignItems:"center",
    padding:20
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
  },
  image: {
    alignSelf:"center",
    width: "170%",
    height: 500,
    borderRadius: 20,
  },
  icon: {

  },
  sectionHeader: {
    alignSelf:"center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    textAlign:"center",
    alignSelf:"center",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Home;
