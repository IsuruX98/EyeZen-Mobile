import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute, useNavigation } from "@react-navigation/native";
import Axios from "../apis/axios";

const AyurvedicVideo = () => {
    const route = useRoute();
    const { videoId } = route.params;
    const navigation = useNavigation();

    // State to store video data
    const [videoData, setVideoData] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get("videoTutorial")
            .then((response) => {
                setVideoData(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Find the video data based on the videoId
    const video = videoData.find((video) => video._id === videoId);

    useEffect(() => {
        if (video) {
            setVideoUrl(video.videoUrl);
            setLoading(false)
        }
    }, [video]);

    if (!videoUrl) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                {/* Embed the video player using WebView from react-native-webview */}
                <WebView
                    source={{ uri: videoUrl }}
                    style={styles.videoPlayer}
                />
            </View>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    videoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    videoPlayer: {
        width: "100%",
        height: 200, // You can adjust the height based on your preference
    },
    goBackButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 80,
        alignSelf: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AyurvedicVideo;
