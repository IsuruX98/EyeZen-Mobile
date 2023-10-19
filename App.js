import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BottomNavBar from "./pages/BottomNavBar";
import AyurvedicEyeCareHome from "./pages/Ayurvedic/AyurvedicEyeCareHome";
import AyurvedicVideo from "./pages/Ayurvedic/AyurvedicVideo";
import Map from "./pages/DoctorContact/Map";
import DoctorList from "./pages/DoctorContact/DoctorList";
import DoctorDetails from "./pages/DoctorContact/DoctorDetails";
import DoctorPin from "./pages/DoctorContact/DoctorPin";
import InfantQuizHome from "./pages/InfantEyeCare/InfantQuizHome";
import QuestionnaireScreen from "./pages/InfantEyeCare/QuestionnaireScreen";
import AdminHome from "./pages/Admin/AdminHome";
import AdminDoctorList from "./pages/Admin/AdminDoctorList";
import AddDoctor from "./pages/Admin/AddDoctor";
import AdminTreatmentList from "./pages/Admin/AdminTreatmentList";
import AdminVideoTutorialList from "./pages/Admin/AdminVideoTutorialList";
import AddTreatment from "./pages/Admin/AddTreatment";
import UpdateTreatment from "./pages/Admin/UpdateTreatments";
import AddVideoTutorial from "./pages/Admin/AddVideoTutorial";
import UpdateVideoTutorial from "./pages/Admin/UpdateVideoTutorial";
import UpdateDoctor from "./pages/Admin/UpdateDoctor";
import MainQuiz from "./pages/MainQuiz/MainQuiz";
import TestsHome from "./pages/EyeTests/TestsHome";
import ColorBlind from "./pages/EyeTests/ColorBlind";
import NotFound from "./pages/NotFound";
import ColorBlindTest from "./pages/EyeTests/Checkups/ColorBlindTest";
import MacularDegeneration from "./pages/EyeTests/MacularDegeneration";
import MacularTest from "./pages/EyeTests/Checkups/MacularTest";
import ViewQuiz from "./pages/Admin/ViewQuiz";
import CreateQuizQuestion from "./pages/Admin/CreateQuizQuestion";
import QuestionPage from "./pages/MainQuiz/QuestionPage";
import QuizResults from "./pages/MainQuiz/QuizResults";
import GameHome from "./pages/KidGames/GameHome";
import CreateMainQuestions from "./pages/Admin/CreateMainQuestions";
import ViewAllMainQuestions from "./pages/Admin/ViewAllMainQuestions";
import UpdateMainQuestion from "./pages/Admin/UpdateMainQuestion";

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
        <Stack.Screen
          name="ViewQuiz"
          component={ViewQuiz}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateQuizQuestion"
          component={CreateQuizQuestion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainQuiz"
          component={MainQuiz}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestsHome"
          component={TestsHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ColorBlind"
          component={ColorBlind}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MacularDegeneration"
          component={MacularDegeneration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MacularDegenerationTest"
          component={MacularTest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ColorBlindTest"
          component={ColorBlindTest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="*"
          component={NotFound}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainQuizPage"
          component={QuestionPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizResults"
          component={QuizResults}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameHome"
          component={GameHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateMainQuestions"
          component={CreateMainQuestions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewMainQuestions"
          component={ViewAllMainQuestions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateAllQuestions"
          component={UpdateMainQuestion}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
