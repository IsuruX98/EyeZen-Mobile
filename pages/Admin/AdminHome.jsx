import React, {useContext, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import hero from '../../assets/home.png';
import doctorContactImage from "../../assets/ayurvrdic/doctorcontact.png";
import Faq from "../../components/Faq";

const AdminHome = ({navigation}) => {

    const scrollViewRef = useRef(null); // Create a ref for ScrollView

    const scroll = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 900, animated: true }); // Adjust the value based on your layout
        }
    };

    return (
        <ScrollView ref={scrollViewRef} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Welcome</Text>
                <Text style={styles.subHeader}>Admin</Text>
                <Text style={styles.description}>
                    Unlock a World of Visual Wellness
                </Text>
            </View>
            <TouchableOpacity
                style={styles.button1}
                onPress={scroll}
            >
                <Text style={styles.buttonText1}>Get Started</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={doctorContactImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.sections}>
                Admin Sections
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('AdminTreatmentList');
                }}
            >
                <Text style={styles.buttonText}>Treatments</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('AdminVideoTutorialList');
                }}
            >
                <Text style={styles.buttonText}>Video tutorials</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('AdminDoctorList');
                }}
            >
                <Text style={styles.buttonText}>Doctors</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {

                }}
            >
                <Text style={styles.buttonText}>Main Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('ViewQuiz');
                }}
            >
                <Text style={styles.buttonText}>Infant Quizs</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // Handle button click
                }}
            >
                <Text style={styles.buttonText}>Add Text for sighted Test</Text>
            </TouchableOpacity>
            <View style={{paddingBottom:150}}>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 90,
    },
    sections:{
        fontSize:30,
        fontWeight:"bold",
        alignSelf:"center",
        paddingBottom:10
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
        paddingTop:10,
        fontWeight:"bold",
        fontSize: 18,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 600,
        borderRadius: 20,
    },
    button: {
        alignSelf:"center",
        marginTop:20,
        width:"90%",
        backgroundColor: "#004AAD",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    button1: {
        alignSelf:"center",
        backgroundColor: "#004AAD",
        width:"50%",
        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText1: {
        textAlign:"center",
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AdminHome;
