import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FarSightedResult = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://eyezen.vercel.app/near-test-view' }} // Replace with your desired website URL
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default FarSightedResult;
