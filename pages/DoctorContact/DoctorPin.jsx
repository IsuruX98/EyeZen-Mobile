import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const DoctorPin = ({ isVisible, onClose, doctor }) => {
    const { latitude, longitude } = doctor;

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.container}>
                <Text style={{color:"#004AAD",fontWeight:"900",fontSize:33,paddingBottom:20, paddingTop:20}}>Doctor's Location</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                        }}
                    />
                </MapView>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingVertical:40
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#007BFF",
    },
    map: {
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
    },
    closeButton: {
        backgroundColor: "#004AAD",
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    closeButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default DoctorPin;
