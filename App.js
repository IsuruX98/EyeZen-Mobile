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
import InfantQuizHome from "./pages/InfantQuizHome";
import QuestionnaireScreen from "./pages/QuestionnaireScreen";
import AdminHome from "./pages/AdminHome";
import AdminDoctorList from "./pages/AdminDoctorList";
import AddDoctor from "./pages/AddDoctor";
import AdminTreatmentList from "./pages/AdminTreatmentList";
import AdminVideoTutorialList from "./pages/AdminVideoTutorialList";
import AddTreatment from "./pages/AddTreatment";
import UpdateTreatment from "./pages/UpdateTreatments";
import AddVideoTutorial from "./pages/AddVideoTutorial";
import UpdateVideoTutorial from "./pages/UpdateVideoTutorial";
import UpdateDoctor from "./pages/UpdateDoctor";

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
            <Stack.Screen
                name="InfantQuizHome"
                component={InfantQuizHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="InfantQuestionnaire"
                component={QuestionnaireScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Admin"
                component={AdminHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AdminDoctorList"
                component={AdminDoctorList}
                options={{ headerShown: false }}
            />
          <Stack.Screen
              name="AddDoctor"
              component={AddDoctor}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="AdminTreatmentList"
              component={AdminTreatmentList}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="AdminVideoTutorialList"
              component={AdminVideoTutorialList}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="AddTreatment"
              component={AddTreatment}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="UpdateTreatment"
              component={UpdateTreatment}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="AddVideoTutorial"
              component={AddVideoTutorial}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="UpdateVideoTutorial"
              component={UpdateVideoTutorial}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="UpdateDoctor"
              component={UpdateDoctor}
              options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
