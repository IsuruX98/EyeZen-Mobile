import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import Axios from "../apis/axios";

const VideoTutorials = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        Axios.get("videoTutorial")
            .then((response) => {
                setVideoData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Filter videos based on search query and selected type
    const filteredVideos = videoData.filter((video) => {
        return (
            (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                video.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (selectedType === "All Types" || video.type === selectedType)
        );
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Video Tutorials</Text>
            </View>

            {/* Search Input */}
            <TextInput
                style={styles.input}
                placeholder="Search by title or description"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />

            {/* List of VideoCards */}
            <FlatList
                data={filteredVideos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                            navigation.navigate("AyurvedicVideo", { videoId: item._id });
                        }}
                    >
                        <Image
                            source={{ uri: item.thumbnailUrl }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 80,
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
    textContainer: {
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
    flatListContent: {
        paddingBottom: 20,
    },
});

export default VideoTutorials;
