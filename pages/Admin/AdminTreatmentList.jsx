import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator
} from "react-native";
import Axios from "../../apis/axios";
import { useFocusEffect } from '@react-navigation/native';

const AdminTreatmentList = ({navigation}) => {
    const [treatmentData, setTreatmentData] = useState([]);
    const [filteredTreatments, setFilteredTreatments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTreatmentData = async () => {
        try {
            const response = await Axios.get("treatments");
            setTreatmentData(response.data);
            setFilteredTreatments(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching treatment data:", error);
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // Fetch data here
            fetchTreatmentData();

            return () => {
                // Clean up if necessary
            };
        }, [])
    );

    useEffect(() => {
        if (searchQuery) {
            const filteredTreatments = treatmentData.filter((treatment) => {
                return (
                    treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    treatment.type.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredTreatments(filteredTreatments);
        } else {
            setFilteredTreatments(treatmentData);
        }
    }, [searchQuery, treatmentData]);

    const handleDeleteTreatment = (id) => {
        Alert.alert(
            "Delete Treatment",
            "Are you sure you want to delete this treatment?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        Axios.delete(`treatments/${id}`)
                            .then(() => {
                                setTreatmentData((prevData) =>
                                    prevData.filter((treatment) => treatment._id !== id)
                                );
                            })
                            .catch((error) => {
                                console.error("Error deleting treatment:", error);
                            });
                    },
                    style: "destructive",
                },
            ]
        );
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
            <Text style={styles.headerText}>Treatment List</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title, type"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTreatment')}
            >
                <Text style={styles.addButtonText}>Add Treatment</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredTreatments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.treatmentCard}>
                        <Image source={{ uri: item.photoUrl }} style={styles.treatmentImage} />
                        <View style={styles.treatmentInfo}>
                            <Text style={styles.treatmentTitle}>{item.title}</Text>
                            <Text style={styles.treatmentType}>{item.type}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() =>
                                navigation.navigate("UpdateTreatment", {
                                    treatmentDetails: item,
                                })
                            }
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteTreatment(item._id)}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
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
    treatmentCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 16,
    },
    treatmentImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    treatmentInfo: {
        flex: 1,
    },
    treatmentTitle: {
        fontSize: 13,
        fontWeight: "bold",
    },
    treatmentType: {
        fontSize: 12,
        color: "#777",
    },
    updateButton: {
        backgroundColor: "#004AAD",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: "#FF0000",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
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
});

export default AdminTreatmentList;
