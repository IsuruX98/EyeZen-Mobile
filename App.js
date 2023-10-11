import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BottomNavBar from "./pages/BottomNavBar";
import AyurvedicEyeCareHome from "./pages/AyurvedicEyeCareHome";
import AyurvedicVideo from "./pages/AyurvedicVideo";
import Map from "./pages/Map";

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
              name="AyurvedicEyeCareHome" // Specify the screen name
              component={AyurvedicEyeCareHome} // Specify the component
              options={{ headerShown: false }}
          />
            <Stack.Screen
                name="AyurvedicVideo" // Specify the screen name
                component={AyurvedicVideo} // Specify the component
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Map" // Specify the screen name
                component={Map} // Specify the component
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
