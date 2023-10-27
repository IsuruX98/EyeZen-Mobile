import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AxiosAPI from '../../apis/axios'
import { Video } from 'expo-av';

const UpdateVideoTutorial = ({ route,navigation }) => {
    const { videoTutorialDetails } = route.params;
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [video, setVideo] = useState(null);
    const [selectedVideoUri, setSelectedVideoUri] = useState(videoTutorialDetails.videoUrl);
    const [videoUrl, setVideoUrl] = useState(videoTutorialDetails.videoUrl);
    const [thumbnailUrl, setThumbnailUrl] = useState(videoTutorialDetails.thumbnailUrl);

    const [videoTutorialInfo, setVideoTutorialInfo] = useState({
        title: videoTutorialDetails.title,
        type: videoTutorialDetails.type,
        description: videoTutorialDetails.description,
        videoUrl: videoTutorialDetails.videoUrl,
        thumbnailUrl: videoTutorialDetails.thumbnailUrl
    });

    useEffect(() => {
        (async () => {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Sorry, we need camera roll permissions to make this work!',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                );
            }
        })();
    }, []);

    const handleInputChange = (name, value) => {
        setVideoTutorialInfo({ ...videoTutorialInfo, [name]: value });
    };

    const handleVideoUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedVideoUri = result.assets[0].uri;
            setSelectedVideoUri(selectedVideoUri);
            // This variable is not defined anywhere in your code.
            // You should use selectedVideoUri instead of selectedImageUri.
            setVideoTutorialInfo({...videoTutorialInfo, videoUrl: selectedVideoUri});
            setVideo(selectedVideoUri);
        }
    };

    const handleThumbnailUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setVideoTutorialInfo({...videoTutorialInfo,thumbnailUrl:selectedImageUri})
            setPhoto(selectedImageUri);
        }
    };


    const handleSubmit = async () => {
        setLoading(true);

        if (!videoTutorialInfo.title || !videoTutorialInfo.type || !videoTutorialInfo.description) {
            Alert.alert("Error", "Please fill out all fields.");
            setLoading(false);
            return;
        }

        if (photo && video) {
            const thumbnailFormData = new FormData();
            thumbnailFormData.append('file', {
                uri: photo,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            thumbnailFormData.append('upload_preset', 'upload');

            const videoFormData = new FormData();
            videoFormData.append('file', {
                uri: video,
                type: 'video/mp4', // Modify the type based on the video format
                name: 'video.mp4',
            });
            videoFormData.append('upload_preset', 'upload');

            try {
                // Upload thumbnail to Cloudinary
                const thumbnailResponse = await axios.post(
                    'https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload',
                    thumbnailFormData
                );

                // Upload video to Cloudinary
                const videoResponse = await axios.post(
                    'https://api.cloudinary.com/v1_1/dpgelkpd4/video/upload',
                    videoFormData
                );

                if (thumbnailResponse.data.secure_url && videoResponse.data.secure_url) {

                    setVideoTutorialInfo({...videoTutorialInfo,thumbnailUrl: thumbnailResponse.data.secure_url,})
                    setVideoTutorialInfo({...videoTutorialInfo, videoUrl: videoResponse.data.secure_url});

                    try {
                        const response = await AxiosAPI.put(`videoTutorial/${videoTutorialDetails._id}`, videoTutorialInfo);
                        console.log('Backend response:', response.data);
                        setLoading(false);
                        Alert.alert(
                            'Success',
                            'Tutorial updated successfully.',
                            [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                        );
                        navigation.navigate('AdminVideoTutorialList')
                    } catch (error) {
                        console.log('Error updating Tutorial:', error);
                        setLoading(false);
                        Alert.alert(
                            'Error',
                            'There was an error updating the Tutorial. Please try again later.',
                            [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                        );
                    }
                } else {
                    console.log('Image or video upload failed.');
                }
            } catch (error) {
                console.log('Error uploading image or video:', error);
                Alert.alert(
                    'Upload Failed',
                    'There was an error uploading the image or video. Please try again later.',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                );
            }
        } else {
            Alert.alert(
                'Incomplete Data',
                'Please upload both the video and the thumbnail before submitting.',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}]
            );
            setLoading(false);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleConfirmation = () => {
        Alert.alert(
            'Confirm Update',
            'Are you sure you want to update this video tutorial?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => handleSubmit(),
                },
            ],
            { cancelable: false }
        );
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007BFF"/>
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Update Video Tutorial</Text>
                {selectedVideoUri && (
                    <Video
                        source={{ uri: selectedVideoUri }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={false}
                        useNativeControls
                        style={{ width: 330, height: 200,marginBottom:25 }} // Set the desired dimensions for the video
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={videoTutorialInfo.title}
                    onChangeText={(text) => handleInputChange('title', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    value={videoTutorialInfo.type}
                    onChangeText={(text) => handleInputChange('type', text)}
                />
                <TextInput
                    style={styles.inputMulti}
                    placeholder="Description"
                    value={videoTutorialInfo.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleVideoUpload}>
                    <Text style={styles.buttonText}>Upload Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleThumbnailUpload}>
                    <Text style={styles.buttonText}>Upload Thumbnail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleConfirmation}>
                    <Text style={styles.buttonText}>Update Video Tutorial</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: '#004AAD',
        fontWeight: '900',
        fontSize: 32,
        paddingBottom: 30,
        textAlign:"center"
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    inputMulti: {
        width: '100%',
        height: 70,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 40,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#004AAD',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default UpdateVideoTutorial;
