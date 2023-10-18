import React, { useState, useEffect } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleLogin = async () => {
        if (email === "admin@gmail.com" && password === "1234") {
            navigation.navigate('Admin');
        } else {
            try {
                setLoading(true); // Set loading to true when login starts
                await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
                // If login is successful, navigate to the Home screen
                navigation.navigate('EyeZen');
            } catch (error) {
                // Handle login errors (display error messages, etc.)
                Alert.alert("Error", error.message); // Show Firebase error message in an alert
            } finally {
                setLoading(false); // Set loading to false when login operation is done (success or error)
            }
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
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ResetPasswordScreen")}
                >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center", alignItems: "center", padding: 40,
    }, logo: {
        width: 300,
        height:200


    }, input: {
        height: 40,
        width: "100%",
        borderColor: "#333333",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
    },forgotPassword: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 24,
    },
    forgot: {
        fontSize: 13,
    }, loginButton: {
        backgroundColor: "#004AAD", padding: 15, width: "100%", alignItems: "center", borderRadius: 10,
    }, buttonText: {
        color: "white", fontWeight: "bold",
    }, signupText: {
        marginTop: 20, color: "#333333", fontWeight: "bold",
    },
});


export default Login;
