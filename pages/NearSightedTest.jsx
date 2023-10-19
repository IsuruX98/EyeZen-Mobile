import React from "react";
import {Text, TouchableOpacity, View, Linking} from "react-native";

import Axios from "../apis/axios";
const NearSightedTest = ({navigation}) => {

    const openExternalLink = () => {
        const externalURL = 'https://eyezen-dw61jxx57-isurux98s-projects.vercel.app/near-sighted'; // Replace this with your external link
        Linking.openURL(externalURL)
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <View style={{flex : 1, justifyContent:'center', alignContent: 'center'}}>
            <TouchableOpacity
                onPress={externalURL}
            >
            <Text>hi</Text>
            </TouchableOpacity>
        </View>
    )

}

export default NearSightedTest;
