import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import pass from "../assets/sighted/pass.png";

const FarSightedResult = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Wow!,</Text>
                <Text style={styles.subHeader}>You have Passed the Test...!</Text>
                <Text style={styles.description}>
                    No need to contact a Ophthalmologists
                </Text>

            </View>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={pass} resizeMode="contain" />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate("TestsHome")}>
                    <Text style={styles.buttonText}>Try Another Test</Text>
                </TouchableOpacity>
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
        fontSize: 50,
        fontWeight: "900",
    },
    subHeader: {
        fontSize: 40,
        fontWeight: "900",
        color: "#004AAD",
        textAlign: "center"
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
        marginBottom: 30
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
        padding: 20,
    },
    image: {
        width: 650,
        height: "90%",
        borderRadius: 20,
    },
});

export default FarSightedResult;
