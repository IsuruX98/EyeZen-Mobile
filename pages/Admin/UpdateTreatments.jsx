import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    Alert, ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AxiosAPI from "../../apis/axios";

const UpdateTreatment = ({ route,navigation }) => {
    const { treatmentDetails } = route.params;
    const [treatmentInfo, setTreatmentInfo] = useState({
        title: treatmentDetails.title,
        type: treatmentDetails.type,
        description: treatmentDetails.description,
        photoUrl: treatmentDetails.photoUrl,
    });
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const handleInputChange = (name, value) => {
        setTreatmentInfo({ ...treatmentInfo, [name]: value });
    };

    const handleImageUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setTreatmentInfo({ ...treatmentInfo, photoUrl: selectedImageUri });
            setPhoto(selectedImageUri);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        // Validate empty fields
        const requiredFields = ['title', 'type', 'description', 'photoUrl'];
        const errorFields = requiredFields.filter(field => !treatmentInfo[field]);
        if (errorFields.length > 0) {
            setLoading(false);
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        // Validate title (only letters and spaces allowed)
        if (!/^[a-zA-Z\s]*$/.test(treatmentInfo.title)) {
            setLoading(false);
            Alert.alert('Error', 'Invalid title. Title can only contain letters and spaces.');
            return;
        }

        if (photo) {
            const formData = new FormData();
            formData.append('file', {
                uri: photo,
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

                        try {
                            const response = await AxiosAPI.put(`treatments/${treatmentDetails._id}`, treatmentInfo);
                            console.log('Backend response:', response.data);
                            setLoading(false);
                            Alert.alert(
                                'Success',
                                'Treatment Updated successfully.',
                                [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                            );
                            navigation.navigate('AdminTreatmentList')
                        } catch (error) {
                            console.log('Error Updating treatment:', error);
                            setLoading(false);
                            Alert.alert(
                                'Error',
                                'There was an error Updating the treatment. Please try again later.',
                                [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                            );
                        }



                } else {
                    console.log('Image upload failed.');
                }
            } catch (error) {
                console.log('Error uploading image:', error);
                Alert.alert(
                    'Image Upload Failed',
                    'There was an error uploading your image. Please try again later.',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                );
            }
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleConfirmation = () => {
        Alert.alert(
            'Confirm Update',
            'Are you sure you want to update this treatment?',
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
                <TouchableOpacity style={styles.button} onPress={handleConfirmation}>
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
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
