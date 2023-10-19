import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AxiosAPI from '../../apis/axios'

const AddTreatment = ({navigation}) => {
    const [treatmentInfo, setTreatmentInfo] = useState({
        title: '',
        type: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
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
        setTreatmentInfo({...treatmentInfo, [name]: value});
    };

    const handleImageUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();

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
                const imageUrl = cloudinaryResponse.data.secure_url;

                if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {

                    const updatedTreatmentInfo = {
                        ...treatmentInfo,
                        photoUrl: cloudinaryResponse.data.secure_url,
                    };

                    if (updatedTreatmentInfo) {
                        try {
                            const response = await AxiosAPI.post('treatments', updatedTreatmentInfo);
                            console.log('Backend response:', response.data);
                            setTreatmentInfo({
                                title: '',
                                type: '',
                                description: '',
                                photoUrl: '',
                            });
                            setLoading(false);
                            Alert.alert(
                                'Success',
                                'Treatment added successfully.',
                                [{text: 'OK', onPress: () => console.log('OK Pressed')}]
                            );
                        } catch (error) {
                            console.log('Error adding treatment:', error);
                            setLoading(false);
                            Alert.alert(
                                'Error',
                                'There was an error adding the treatment. Please try again later.',
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
                <Text style={styles.headerText}>Add Treatments</Text>
                {selectedImageUri && (
                    <Image source={{uri: selectedImageUri}} style={styles.selectedImage}/>
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
                    <Text style={styles.buttonText}>Add Treatment</Text>
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
    selectedImage: {
        width: 200, // Set the width as per your UI design
        height: 200, // Set the height as per your UI design
        resizeMode: 'contain', // You can adjust the resizeMode property as needed
        marginBottom: 16,
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
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AddTreatment;
