import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from '../apis/axios';

const AddVideoTutorial = () => {
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const [videoTutorialInfo, setVideoTutorialInfo] = useState({
        title: '',
        type: '',
        description: '',
    });

    const handleInputChange = (name, value) => {
        setVideoTutorialInfo({ ...videoTutorialInfo, [name]: value });
    };

    const handleVideoUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });

        if (!result.cancelled) {
            const formData = new FormData();
            formData.append('file', {
                uri: result.uri,
                type: 'video/mp4',
                name: 'video.mp4',
            });
            formData.append('upload_preset', 'upload');

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dpgelkpd4/video/upload',
                    formData
                );

                if (response.data && response.data.secure_url) {
                    setVideoUrl(response.data.secure_url);
                } else {
                    console.log('Video upload failed.');
                }
            } catch (error) {
                console.log('Error uploading video:', error);
            }
        }
    };

    const handleThumbnailUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (!result.cancelled) {
            const formData = new FormData();
            formData.append('file', {
                uri: result.uri,
                type: 'image/jpeg',
                name: 'thumbnail.jpg',
            });
            formData.append('upload_preset', 'upload');

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload',
                    formData
                );

                if (response.data && response.data.secure_url) {
                    setThumbnailUrl(response.data.secure_url);
                } else {
                    console.log('Thumbnail upload failed.');
                }
            } catch (error) {
                console.log('Error uploading thumbnail:', error);
            }
        }
    };

    const handleSubmit = async () => {
        if (!videoTutorialInfo.title || !videoTutorialInfo.type || !videoTutorialInfo.description) {
            console.log('Title, Type, and Description are required fields.');
            return;
        }

        const updatedVideoTutorialInfo = {
            ...videoTutorialInfo,
            videoUrl: videoUrl,
            thumbnailUrl: thumbnailUrl,
        };

        try {
            setLoading(true);

            const response = await axios.post('videoTutorial', updatedVideoTutorialInfo);

            console.log('Backend response:', response.data);

            console.log('Video tutorial added successfully.');
        } catch (error) {
            console.log('Error adding video tutorial:', error);
        } finally {
            setLoading(false);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

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
