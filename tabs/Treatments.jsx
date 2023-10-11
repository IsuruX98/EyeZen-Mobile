import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import Axios from "../apis/axios";

const Treatments = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [treatmentsData, setTreatmentsData] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading state initially to true

    useEffect(() => {
        Axios.get("treatments")
            .then((response) => {
                setTreatmentsData(response.data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    const filteredTreatments = treatmentsData.filter((treatment) => {
        const isMatchingType = selectedType === "All Types" || treatment.type === selectedType;
        const isMatchingQuery = treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            treatment.description.toLowerCase().includes(searchQuery.toLowerCase());

        return isMatchingType && isMatchingQuery;
    });

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={{color:"#004AAD",fontWeight:"900",fontSize:40,paddingBottom:20}}>Ayurvedic Treatments</Text>
            <TextInput
                style={styles.input}
                placeholder="Search by title or description"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            <View style={styles.view1}>
            <FlatList
                data={filteredTreatments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image
                            source={{ uri: item.photoUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContent}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    view1:{
        paddingTop:20,
        paddingBottom:90
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 32,
        color: "#004AAD",
        fontWeight: "900",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
    },
    card: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    image: {
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    readMoreButton: {
        alignSelf: "flex-end",
        marginTop: 8,
    },
    readMoreText: {
        color: "#007BFF",
        fontWeight: "bold",
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

export default Treatments;
