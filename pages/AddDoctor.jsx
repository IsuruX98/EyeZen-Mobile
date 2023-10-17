import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const DoctorForm = () => {
    const [doctorInfo, setDoctorInfo] = useState({
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
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setDoctorInfo({ ...doctorInfo, [name]: value });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            handleInputChange('profilePicUrl', result.uri);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append('file', {
                uri: doctorInfo.profilePicUrl,
                name: 'profile.jpg',
                type: 'image/jpg',
            });
            formData.append('upload_preset', 'upload');

            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload',
                formData
            );

            console.log(doctorInfo)

            if (response.data && response.data.secure_url) {
                // Image uploaded successfully to Cloudinary
                const updatedDoctorInfo = {
                    ...doctorInfo,
                    servicesOffered: doctorInfo.servicesOffered
                        .split(",")
                        .map((item) => item.trim()),
                    acceptedPaymentMethods: doctorInfo.acceptedPaymentMethods
                        .split(",")
                        .map((item) => item.trim()),
                    profilePicUrl: response.data.secure_url
                };

                console.log(updatedDoctorInfo)
                // Send updatedDoctorInfo object to backend
                const response = await axios.post(
                    "doctors",
                    updatedDoctorInfo
                );

                // Handle the response from the backend
                console.log("Backend response:", response.data);
                setLoading(false);
                Alert.alert(
                    'Success',
                    'Doctor information added successfully!',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            } else {
                Alert.alert(
                    'Error',
                    'Image upload failed..',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            }
        } catch (error) {
            setLoading(false);
            // Handle error
            console.error('Error sending data to the backend:', error);

            Alert.alert(
                'Error',
                'Failed to add doctor information. Please try again later.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.headerText}>Add Doctor</Text>
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

            {doctorInfo.profilePicUrl && <Image source={{ uri: doctorInfo.profilePicUrl }} style={styles.previewImage} />}

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Doctor</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#9744be" />}
            <View style={{paddingBottom:100}}></View>
        </View>
        </ScrollView>
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
        width: 200,
        height: 200,
        marginBottom: 16,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    addButton: {
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

export default DoctorForm;
