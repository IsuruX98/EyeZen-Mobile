import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Image, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import Axios from "../apis/axios";

const DoctorList = ({ route, navigation }) => {
    const [doctorData, setDoctorData] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get("doctors")
            .then((response) => {
                setDoctorData(response.data);
                setFilteredDoctors(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filteredDoctors = doctorData.filter((doctor) => {
                return (
                    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    doctor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    doctor.town.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredDoctors(filteredDoctors);
        } else {
            setFilteredDoctors(doctorData);
        }
    }, [searchQuery, doctorData]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Doctor List</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name, specialization, type, or town"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            <FlatList
                data={filteredDoctors}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.doctorCard}
                        onPress={() => navigation.navigate('DoctorDetails', { email: item.email })}
                    >
                        <Image
                            source={{ uri: item.profilePicUrl }}
                            style={styles.profileImage}
                        />
                        <View style={styles.doctorInfo}>
                            <Text style={styles.doctorName}>{item.name}</Text>
                            <Text style={styles.specialization}>{item.specialization}</Text>
                            <Text style={styles.additionalInfo}>{item.type} - {item.town}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => navigation.navigate('DoctorDetails', { email: item.email })}
                        >
                            <Text style={styles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 80,
        backgroundColor: "#fff",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "#004AAD",
        fontWeight: "900",
        fontSize: 40,
        paddingBottom: 20,
    },
    searchInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 16,
        paddingRight: 16,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    specialization: {
        fontSize: 14,
        color: "#555",
    },
    additionalInfo: {
        fontSize: 14,
        color: "#777",
    },
    viewButton: {
        backgroundColor: "#004AAD",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    viewButtonText: {
        color: "#fff",
        fontWeight:"bold"
    },
});

export default DoctorList;
