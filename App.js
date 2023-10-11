import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BottomNavBar from "./pages/BottomNavBar";
import AyurvedicEyeCareHome from "./pages/AyurvedicEyeCareHome";
import AyurvedicVideo from "./pages/AyurvedicVideo";
import Map from "./pages/Map";
import DoctorList from "./pages/DoctorList";
import DoctorDetails from "./pages/DoctorDetails";
import DoctorPin from "./pages/DoctorPin";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="EyeZen"
              component={BottomNavBar}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="AyurvedicEyeCareHome"
              component={AyurvedicEyeCareHome}
              options={{ headerShown: false }}
          />
            <Stack.Screen
                name="AyurvedicVideo"
                component={AyurvedicVideo}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Map"
                component={Map}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DoctorList"
                component={DoctorList}
                options={({ navigation }) => ({
                    headerShown: false,
                    screenProps: { navigation }, // Pass navigation as a screen prop
                })}
            />
          <Stack.Screen
              name="DoctorDetails"
              component={DoctorDetails}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="DoctorPin"
              component={DoctorPin}
              options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
