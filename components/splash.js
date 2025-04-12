import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4169E1', // Royal Blue
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
});

const SplashScreen = () => {
    return (
        <View style={styles.splashContainer}>
            <Text style={styles.logoText}>Al-Quran Navigator</Text>
        </View>
    );
};

export default SplashScreen;

