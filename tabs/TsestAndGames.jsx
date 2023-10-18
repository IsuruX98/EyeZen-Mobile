import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

const TestsAndGames = ({navigation}) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.heading}>Tests & Games</Text>
            <View>
                <TouchableOpacity style={styles.button}
                                  onPress={() => {
                                      // Handle button press logic here
                                      navigation.navigate("NearSightedTest");
                                  }}
                >
                    <Text style={styles.buttonText}>Near-Sighted Test</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  onPress={() => {
                                      // Handle button press logic here
                                      navigation.navigate("FarSightedTest");
                                  }}
                >
                    <Text style={styles.buttonText}>Far-Sighted Test</Text>
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
        textAlign: "center"
    },
    heading:{
        fontSize : 24
    }
});


export default TestsAndGames;
