import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert, ActivityIndicator,
} from "react-native";
import Axios from "../apis/axios";

const AdminVideoTutorialList = () => {
    const [videoTutorials, setVideoTutorials] = useState([]);
    const [filteredVideoTutorials, setFilteredVideoTutorials] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get("videoTutorial")
            .then((response) => {
                setVideoTutorials(response.data);
                setFilteredVideoTutorials(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching video tutorial data:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filteredTutorials = videoTutorials.filter((videoTutorial) => {
                return (
                    videoTutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    videoTutorial.type.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredVideoTutorials(filteredTutorials);
        } else {
            setFilteredVideoTutorials(videoTutorials);
        }
    }, [searchQuery, videoTutorials]);

    const handleDeleteVideoTutorial = (id) => {
        Alert.alert(
            "Delete Video Tutorial",
            "Are you sure you want to delete this video tutorial?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        Axios.delete(`videoTutorial/${id}`)
                            .then(() => {
                                setVideoTutorials((prevData) =>
                                    prevData.filter((videoTutorial) => videoTutorial._id !== id)
                                );
                            })
                            .catch((error) => {
                                console.error("Error deleting video tutorial:", error);
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
            <Text style={styles.headerText}>Video Tutorials</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title, type"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddVideo')}
            >
                <Text style={styles.addButtonText}>Add Video</Text>
            </TouchableOpacity>
            <FlatList
                data={filteredVideoTutorials}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.videoTutorialCard}>
                        <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnailImage} />
                        <View style={styles.tutorialInfo}>
                            <Text style={styles.tutorialTitle}>{item.title}</Text>
                            <Text style={styles.tutorialType}>{item.type}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => {
                                // Navigate to the update screen, you can implement this logic based on your navigation setup
                            }}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteVideoTutorial(item._id)}
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
    videoTutorialCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 16,
    },
    thumbnailImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    tutorialInfo: {
        flex: 1,
    },
    tutorialTitle: {
        fontSize: 14,
        fontWeight: "bold",
        paddingHorizontal:10
    },
    tutorialType: {
        paddingTop:5,
        fontSize: 12,
        color: "#777",
        paddingHorizontal:10
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

export default AdminVideoTutorialList;
