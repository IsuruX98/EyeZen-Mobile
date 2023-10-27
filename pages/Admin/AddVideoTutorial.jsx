import React, {useEffect, useState} from 'react';
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

const AddVideoTutorial = () => {
    const [videoTutorialInfo, setVideoTutorialInfo] = useState({
        title: '',
        type: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [video, setVideo] = useState(null);
    const [selectedVideoUri, setSelectedVideoUri] = useState(null);

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
            setSelectedImageUri(selectedImageUri);
            setPhoto(selectedImageUri);
        }
    };

    const handleSubmit = async () => {

        if (!videoTutorialInfo.title || !videoTutorialInfo.type || !videoTutorialInfo.description || !video || !photo) {
            Alert.alert('Error', 'Please fill out all fields and select an video and a thumbnail image.');
            return;
        }

        setLoading(true);

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
                    const updatedVideoTutorialInfo = {
                        ...videoTutorialInfo,
                        videoUrl: videoResponse.data.secure_url,
                        thumbnailUrl: thumbnailResponse.data.secure_url,
                    };

                    try {
                        const response = await AxiosAPI.post('videoTutorial', updatedVideoTutorialInfo);
                        console.log('Backend response:', response.data);
                        setVideoTutorialInfo({
                            title: '',
                            type: '',
                            description: '',
                        });
                        setLoading(false);
                        Alert.alert(
                            'Success',
                            'Tutorial added successfully.',
                            [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                        );
                    } catch (error) {
                        console.log('Error adding Tutorial:', error);
                        setLoading(false);
                        Alert.alert(
                            'Error',
                            'There was an error adding the Tutorial. Please try again later.',
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
                <Text style={styles.headerText}>Add Video Tutorial</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Video Tutorial</Text>
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

export default AddVideoTutorial;
