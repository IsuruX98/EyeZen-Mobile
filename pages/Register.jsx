import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const userEmail = userCredential.user.email;

            // Store user data in Firestore using email as the document ID
            await setDoc(doc(FIRESTORE_DB, 'users', userEmail), {
                name: name,
                email: userEmail, // Store the email as a field (optional)
                mobile: mobile,
            });

            // Navigate to Home screen after successful registration
            navigation.navigate('Login');
        } catch (error) {
            // Handle registration errors (display error messages, etc.)
            Alert.alert("Error", error.message); // Display an alert for Firebase errors
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={text => setName(text)}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                onChangeText={text => setMobile(text)}
                value={mobile}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signInText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    heading:{
        fontWeight: "900",
        fontSize:50,
        marginBottom:50,
        color:"#004AAD"
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: "#333333",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
    },

    registerButton: {
        marginTop:20,
        backgroundColor: "#004AAD",
        padding: 15,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    signInText:{
        marginTop: 20, color: "#333333", fontWeight: "bold",
    }
});

export default Register;