import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { FIRESTORE_DB } from "../firebaseConfig";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const auth = getAuth();
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        setLoadingAuth(false); // User is authenticated
                        const usersCollection = collection(FIRESTORE_DB, 'users');
                        const q = query(usersCollection, where('email', '==', user.email));
                        const querySnapshot = await getDocs(q);
                        if (querySnapshot.size > 0) {
                            querySnapshot.forEach((doc) => {
                                setUserData(doc.data());
                            });
                        } else {
                            console.error("User data not found in Firestore");
                        }
                    } else {
                        setLoadingAuth(false); // User is not authenticated
                    }
                    setLoadingData(false); // Set loading to false once user data is fetched or not found
                });
            } catch (error) {
                console.error("Error fetching user data from Firestore: ", error);
                setLoadingData(false); // Set loading to false in case of an error
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    if (loadingAuth || loadingData) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={require("../assets/profile.jpg")} // Replace with the actual path to your profile image
            />
            <Text style={styles.heading}>User Profile</Text>
            {userData ? (
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Name: {userData.name}</Text>
                    <Text style={styles.userInfoText}>Email: {userData.email}</Text>
                    <Text style={styles.userInfoText}>Mobile: {userData.mobile}</Text>
                </View>
            ) : (
                <Text>Loading user data...</Text>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    heading: {
        fontWeight: "bold",
        fontSize: 32,
        marginBottom: 20,
        color: "#004AAD",
    },
    userInfo: {
        marginBottom: 20,
    },
    userInfoText: {
        fontSize: 18,
        marginBottom: 8,
    },
    logoutButton: {
        backgroundColor: "#F74B4B",
        padding: 15,
        width: "60%",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Profile;
