import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import fail from "../assets/sighted/fail.png";

const FarSightedResultFail = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.header}>Oh!,</Text>
                <Text style={styles.subHeader}>You have Failed the Test...!</Text>
                <Text style={styles.description}>
                    It's better to contact a Ophthalmologists...
                </Text>
                {/*<TouchableOpacity*/}
                {/*    style={styles.button}*/}
                {/*    onPress={() => {*/}
                {/*        // Handle button press logic here*/}
                {/*        navigation.navigate("");*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Text style={styles.buttonText}>Try Again?</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={fail} resizeMode="contain" />
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
        color: "#ce3900",
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
        width: 350,
        height: "90%",
        borderRadius: 20,
    },
});

export default FarSightedResultFail;
