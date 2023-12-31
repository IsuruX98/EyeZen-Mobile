import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
// import hero from "../../assets/home.png";
import doctorContactImage from "../../assets/ayurvrdic/doctorcontact.png";

// import Faq from "../../components/Faq";

const AdminHome = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Welcome</Text>
        <Text style={styles.subHeader}>Admin</Text>
        <Text style={styles.description}>
          Unlock a World of Visual Wellness
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={doctorContactImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.sections}>Admin Sections</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AdminTreatmentList");
        }}
      >
        <Text style={styles.buttonText}>Treatments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AdminVideoTutorialList");
        }}
      >
        <Text style={styles.buttonText}>Video tutorials</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AdminDoctorList");
        }}
      >
        <Text style={styles.buttonText}>Doctors</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ViewMainQuestions");
        }}
      >
        <Text style={styles.buttonText}>Main Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("ViewQuiz");
        }}
      >
        <Text style={styles.buttonText}>Infant Quizes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Handle button click
            navigation.navigate("AddText");
        }}
      >
        <Text style={styles.buttonText}>Add Text for sighted Test</Text>
      </TouchableOpacity>
      <View style={{ paddingBottom: 150 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 90,
  },
  sections: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 10,
  },
  textContainer: {
    alignItems: "center",
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
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
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
  button1: {
      alignSelf: "center",
      marginTop: 20,
      width: "95%",
      backgroundColor: "#004AAD",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
  },
  buttonText1: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AdminHome;
