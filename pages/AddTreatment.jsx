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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AxiosApi from '../apis/axios';

const AddTreatment = () => {
    const [treatmentInfo, setTreatmentInfo] = useState({
        title: '',
        type: '',
        description: '',
        photo: null,
        photoUrl: '',
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
            const selectedImageUri = result.assets[0].uri;
            setTreatmentInfo({ ...treatmentInfo, photo: selectedImageUri });
        }
    };

    console.log(treatmentInfo.photo)

    const handleSubmit = async () => {
        setLoading(true);

        if (treatmentInfo.photo) {
            const formData = new FormData();
            formData.append('file', {
                uri: treatmentInfo.photo,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            formData.append('upload_preset', 'upload');

            try {
                const cloudinaryResponse = await axios.post(
                    'https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload',
                    formData
                );
                const imageUrl = cloudinaryResponse.data.secure_url;
                console.log('Image URL:', imageUrl);

                if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {
                    setTreatmentInfo({ ...treatmentInfo, photoUrl: cloudinaryResponse.data.secure_url });
                } else {
                    console.log('Image upload failed.');
                }
            } catch (error) {
                console.log('Error uploading image:', error);
            }
        }

        try {
            const response = await AxiosApi.post('treatments', treatmentInfo);
            console.log('Backend response:', response.data);
            setTreatmentInfo({
                title: '',
                type: '',
                description: '',
                photo: null,
                photoUrl: 'default_image.jpg',
            });
            console.log('Treatment added successfully.');
        } catch (error) {
            console.log('Error adding treatment:', error);
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
                <Text style={styles.headerText}>Add Treatments</Text>
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
                    <Text style={styles.buttonText}>Add Treatment</Text>
                </TouchableOpacity>
                {loading && <ActivityIndicator size="large" color="#004AAD" />}
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

export default AddTreatment;
