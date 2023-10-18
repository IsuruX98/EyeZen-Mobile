import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../tabs/Home";
import TestsAndGames from "../tabs/TestsAndGames";
import EyeCareSections from "../tabs/EyeCareSections";
import DoctorContact from "../tabs/DoctorContact";
import Profile from "../tabs/Profile";

const home = "Home";
const testsAndGames = "Tests & Games";
const eyeCareSections = "Eye Care";
const doctorContact = "Contact Doctor";
const profile = "Profile";

const Tab = createBottomTabNavigator();

const BottomNavBar = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={home}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === home) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === testsAndGames) {
              iconName = focused
                ? "game-controller"
                : "game-controller-outline";
            } else if (rn === eyeCareSections) {
              iconName = focused ? "eye" : "eye-outline";
            } else if (rn === doctorContact) {
              iconName = focused ? "call" : "call-outline";
            } else if (rn === profile) {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name={home}
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={testsAndGames}
          component={TestsAndGames}
          options={{ headerShown: false }}
        />
        <Tab.Screen name={eyeCareSections} options={{ headerShown: false }}>
          {(props) => <EyeCareSections {...props} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name={doctorContact} options={{ headerShown: false }}>
          {(props) => <DoctorContact {...props} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name={profile} options={{ headerShown: false }}>
          {(props) => <Profile {...props} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavBar;
