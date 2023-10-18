import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Video } from 'expo-av';
import { useRoute, useNavigation } from "@react-navigation/native";
import Axios from "../../apis/axios";

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
                setLoading(false);
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
            setLoading(false);
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
                {/* Use Expo AV's Video component to play the video */}
                <Video
                    source={{ uri: videoUrl }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    useNativeControls
                    style={styles.videoPlayer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
        justifyContent: "center",
    },
    videoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    videoPlayer: {
        width: "100%",
        aspectRatio: 16 / 9, // Aspect ratio for widescreen videos
        borderRadius: 10,
    },
    goBackButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AyurvedicVideo;
