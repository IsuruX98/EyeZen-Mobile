import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Axios from "../../apis/axios";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
    const navigation = useNavigation();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorData, setDoctorData] = useState([]);

    useEffect(() => {
        Axios.get("doctors")
            .then((response) => {
                setDoctorData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleMarkerPress = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 7.8731,
                    longitude: 80.7718,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                {doctorData.map((doctor) => (
                    <Marker
                        key={doctor.name}
                        coordinate={{
                            latitude: parseFloat(doctor.latitude),
                            longitude: parseFloat(doctor.longitude),
                        }}
                        onPress={() => handleMarkerPress(doctor)}
                    >
                        <Callout>
                            <View>
                                <Text>{doctor.name}</Text>
                                <Text>Specialization: {doctor.specialization}</Text>
                                <Text>Mobile: {doctor.mobile}</Text>
                                <Text>Email: {doctor.email}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {selectedDoctor && (
                <View style={styles.selectedDoctorContainer}>
                    <Text style={styles.selectedDoctorText}>
                        {selectedDoctor.name}
                    </Text>
                    <Text style={styles.selectedDoctorText}>
                        Specialization: {selectedDoctor.specialization}
                    </Text>
                    <Text style={styles.selectedDoctorText}>
                        Mobile: {selectedDoctor.mobile}
                    </Text>
                    <Text style={styles.selectedDoctorText}>
                        Email: {selectedDoctor.email}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    selectedDoctorContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    selectedDoctorText: {
        fontSize: 16,
        marginBottom: 8,
    },
    backButton: {
        backgroundColor: "#007BFF",
        paddingTop: 50,
        paddingBottom:20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight:"bold"
    },
});

export default Map;
