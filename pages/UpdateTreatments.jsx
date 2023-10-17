import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback,Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from '../apis/axios';

const UpdateTreatment = ({ route }) => {
    const { treatmentDetails } = route.params;
    const [treatmentInfo, setTreatmentInfo] = useState({
        title: treatmentDetails.title,
        type: treatmentDetails.type,
        description: treatmentDetails.description,
        photoUrl: treatmentDetails.photoUrl,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const handleInputChange = (name, value) => {
        setTreatmentInfo({ ...treatmentInfo, [name]: value });
    };

    const handleImageUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
            const formData = new FormData();
            formData.append('file', {
                uri: result.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            formData.append('upload_preset', 'upload');

            try {
                const cloudinaryResponse = await axios.post(
                    'https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload',
                    formData
                );

                if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {
                    setTreatmentInfo({ ...treatmentInfo, photoUrl: cloudinaryResponse.data.secure_url });
                } else {
                    console.log('Image upload failed.');
                }
            } catch (error) {
                console.log('Error uploading image:', error);
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // Send updated data to your API endpoint
            const response = await axios.put(`treatments/${treatmentDetails.id}`, treatmentInfo);

            // Handle the response from the backend
            console.log('Backend response:', response.data);

            // Show success message to the user
            console.log('Treatment updated successfully.');
        } catch (error) {
            // Handle error
            console.log('Error updating treatment:', error);
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
                <Text style={styles.headerText}>Update Treatment</Text>
                {treatmentInfo.photoUrl && (
                    <Image style={styles.image} resizeMode={"contain"} source={{ uri: treatmentInfo.photoUrl }} />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={treatmentInfo.title}
                    onChangeText={(text) => handleInputChange('title', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    value={treatmentInfo.type}
                    onChangeText={(text) => handleInputChange('type', text)}
                />
                <TextInput
                    style={styles.inputMulti}
                    placeholder="Description"
                    value={treatmentInfo.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
                    <Text style={styles.buttonText}>Pick an image from gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Update Treatment</Text>
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
    image: {
        width: 300,
        height: 200,
        marginBottom: 20,
        borderRadius: 8,
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

export default UpdateTreatment;
