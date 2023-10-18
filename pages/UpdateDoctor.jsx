import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import AxiosAPI from '../apis/axios'
import * as ImagePicker from "expo-image-picker";

const UpdateDoctor = ({ route }) => {
    const { doctorDetails } = route.params;

    // Convert arrays to strings for initial state
    const initialDoctorInfo = {
        ...doctorDetails,
        acceptedPaymentMethods: doctorDetails.acceptedPaymentMethods.join(', '),
        servicesOffered: doctorDetails.servicesOffered.join(', '),
    };

    const [doctorInfo, setDoctorInfo] = useState(initialDoctorInfo);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(doctorDetails.profilePicUrl);
    const [selectedImageUri, setSelectedImageUri] = useState(null);

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
        setDoctorInfo({ ...doctorInfo, [name]: value });
    };

    const pickImage = async () => {
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
        setLoading(true);

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

                    // Split the comma-separated strings into arrays
                    const updatedDoctorInfo = {
                        ...doctorInfo,
                        servicesOffered: doctorInfo.servicesOffered
                            .split(",")
                            .map((item) => item.trim()),
                        acceptedPaymentMethods: doctorInfo.acceptedPaymentMethods
                            .split(",")
                            .map((item) => item.trim()),
                        profilePicUrl: cloudinaryResponse.data.secure_url,

                    };

                    if (updatedDoctorInfo) {
                        try {
                            const response = await AxiosAPI.put('doctors', updatedDoctorInfo);
                            console.log('Backend response:', response.data);
                            setDoctorInfo({
                                name: '',
                                email: '',
                                mobile: '',
                                specialization: '',
                                type: '',
                                town: '',
                                latitude: '',
                                longitude: '',
                                about: '',
                                qualifications: '',
                                experience: '',
                                servicesOffered: '',
                                officeHours: '',
                                acceptedPaymentMethods: '',
                                profilePicUrl: '',
                            })
                            setPhoto(null)
                            setLoading(false);
                            Alert.alert(
                                'Success',
                                'Doctor Updated successfully.',
                                [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                            );
                        } catch (error) {
                            console.log('Error Updating Doctor:', error);
                            setLoading(false);
                            Alert.alert(
                                'Error',
                                'There was an error Updating the Doctor. Please try again later.',
                                [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                            );
                        }
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
            'Are you sure you want to update this doctor?',
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
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.headerText}>Update Doctor</Text>
                {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={doctorInfo.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={doctorInfo.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Mobile"
                    value={doctorInfo.mobile}
                    onChangeText={(text) => handleInputChange('mobile', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Specialization"
                    value={doctorInfo.specialization}
                    onChangeText={(text) => handleInputChange('specialization', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    value={doctorInfo.type}
                    onChangeText={(text) => handleInputChange('type', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Town"
                    value={doctorInfo.town}
                    onChangeText={(text) => handleInputChange('town', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    value={doctorInfo.latitude}
                    onChangeText={(text) => handleInputChange('latitude', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    value={doctorInfo.longitude}
                    onChangeText={(text) => handleInputChange('longitude', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="About"
                    value={doctorInfo.about}
                    onChangeText={(text) => handleInputChange('about', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Qualifications"
                    value={doctorInfo.qualifications}
                    onChangeText={(text) => handleInputChange('qualifications', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Experience"
                    value={doctorInfo.experience}
                    onChangeText={(text) => handleInputChange('experience', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Services Offered (comma-separated)"
                    value={doctorInfo.servicesOffered}
                    onChangeText={(text) => handleInputChange('servicesOffered', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Office Hours"
                    value={doctorInfo.officeHours}
                    onChangeText={(text) => handleInputChange('officeHours', text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Accepted Payment Methods (comma-separated)"
                    value={doctorInfo.acceptedPaymentMethods}
                    onChangeText={(text) => handleInputChange('acceptedPaymentMethods', text)}
                />

                <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.updateButton} onPress={handleConfirmation}>
                    <Text style={styles.buttonText}>Update Doctor</Text>
                </TouchableOpacity>
                <View style={{ paddingBottom: 100 }}></View>
            </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: 80,
        backgroundColor: '#ffffff',
        alignItems: 'center',
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
    imagePickerButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#004AAD',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    previewImage: {
        width: 150,
        height: 150,
        marginBottom: 16,
        resizeMode: 'contain',
        borderRadius: 100,
    },
    updateButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#004AAD',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

export default UpdateDoctor;
