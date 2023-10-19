import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet, Image, ActivityIndicator } from "react-native";
import DoctorLocationModal from "./DoctorPin";
import Axios from "../../apis/axios";

const DoctorDetails = ({ route }) => {
    const { email } = route.params;
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get("doctors")
            .then((response) => {
                const foundDoctor = response.data.find((doc) => doc.email === email);
                if (foundDoctor) {
                    setDoctor(foundDoctor);
                    setLoading(false);
                } else {
                    console.error("Doctor not found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [email]);

    const handleMailClick = () => {
        if (doctor) {
            Linking.openURL(`mailto:${doctor.email}`);
        }
    };

    const handleViewMapClick = () => {
        setIsMapOpen(true);
    };

    const handleCloseMap = () => {
        setIsMapOpen(false);
    };

    if (!doctor || loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoContainer}>
                <Image source={{ uri: doctor.profilePicUrl }} style={styles.profileImage} />
                <Text style={styles.name}>{doctor.name}</Text>
                <Text style={styles.specialization}>{doctor.specialization}</Text>
                <Text style={styles.about}>{doctor.about}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleMailClick}>
                        <Text style={styles.buttonText}>Send a Mail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleViewMapClick}>
                        <Text style={styles.buttonText}>View on Map</Text>
                    </TouchableOpacity>
                </View>
                {isMapOpen && <DoctorLocationModal isOpen={isMapOpen} onClose={handleCloseMap} doctor={doctor} />}
            </View>

            <View style={{paddingBottom:200}}>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Contact Information</Text>
                <Text>Email: {doctor.email}</Text>
                <Text>Mobile: {doctor.mobile}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Doctor Type</Text>
                <Text>{doctor.type}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Qualifications</Text>
                <Text>{doctor.qualifications}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Experience</Text>
                <Text>{doctor.experience}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Services Offered</Text>
                {doctor.servicesOffered.map((service, index) => (
                    <Text key={index}>{service}</Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Office Hours</Text>
                <Text>{doctor.officeHours}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Accepted Payment Methods</Text>
                {doctor.acceptedPaymentMethods.map((method, index) => (
                    <Text key={index}>{method}</Text>
                ))}
            </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 90,
        backgroundColor: "#fff",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    infoContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#004AAD",
    },
    specialization: {
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 8,
        paddingBottom:10,
        color: "#007BFF",
    },
    about: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#004AAD",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    section: {
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#007BFF",
    },
});

export default DoctorDetails;
