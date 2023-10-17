import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from "react-native";
import Axios from "../apis/axios";

const AdminDoctorList = ({ route, navigation }) => {
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

    const handleDeleteDoctor = (email) => {
        // Implement delete functionality here, using Axios or any other API call
        // After successful deletion, you can update the doctorData state and re-render the component
        Alert.alert("Delete Doctor", `Are you sure you want to delete this doctor with email: ${email}?`, [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => {
                    // Make API call to delete the doctor with the given email
                    // Update the doctorData state after successful deletion
                    // For example:
                    // Axios.delete(`doctors/${email}`)
                    //   .then(() => {
                    //     setDoctorData(doctorData.filter((doctor) => doctor.email !== email));
                    //   })
                    //   .catch((error) => {
                    //     console.error("Error deleting doctor:", error);
                    //   });
                },
                style: "destructive",
            },
        ]);
    };

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
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddDoctor')}
            >
                <Text style={styles.addButtonText}>Add Doctor</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredDoctors}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style={styles.doctorCard}>
                        <Image source={{ uri: item.profilePicUrl }} style={styles.profileImage} />
                        <View style={styles.doctorInfo}>
                            <Text style={styles.doctorName}>{item.name}</Text>
                            <Text style={styles.additionalInfo}>
                                {item.type} - {item.town}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => navigation.navigate("DoctorDetails", { email: item.email })}
                        >
                            <Text style={styles.viewButtonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteDoctor(item.email)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
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
    addButton:{
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical:10,
        marginBottom: 16,
        backgroundColor: "#004AAD",
    },
    addButtonText:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold"
    },
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 16,
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    viewButtonText: {
        color: "#fff",
        fontWeight:"bold"
    },
    deleteButton: {
        backgroundColor: "#FF0000",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 5,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default AdminDoctorList;
