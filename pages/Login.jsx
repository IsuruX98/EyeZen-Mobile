import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement your login logic here
        // For example, you can use Firebase authentication

        // After successful login, navigate to the Home screen
        navigation.navigate('Home');
    };

    return (<View style={styles.container}>
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
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("EyeZen")}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
    </View>);
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
