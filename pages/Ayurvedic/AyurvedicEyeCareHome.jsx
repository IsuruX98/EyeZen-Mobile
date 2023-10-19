import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import AyurvedicHome from "../../tabs/AyurvedicHome";
import Treatments from "../../tabs/Treatments";
import VideoTutorials from "../../tabs/VideoTutorials";

const ayurvedicHome = "Ayurvedic Home";
const treatments = "Treatments";
const videoTutorials = "Video Tutorials";

const Tab = createBottomTabNavigator();

const AyurvedicEyeCareHome = ({ navigation }) => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={ayurvedicHome}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === ayurvedicHome) {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === treatments) {
                            iconName = focused ? "medkit" : "medkit-outline";
                        } else if (route.name === videoTutorials) {
                            iconName = focused ? "videocam" : "videocam-outline";
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen
                    name={ayurvedicHome}
                    component={AyurvedicHome}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={treatments}
                    component={Treatments}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={videoTutorials}
                    options={{ headerShown: false }}
                >
                    {(props) => <VideoTutorials {...props} navigation={navigation} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AyurvedicEyeCareHome;
