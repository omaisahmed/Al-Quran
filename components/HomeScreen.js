import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const primaryColor = '#4169E1';
const secondaryColor = '#FFFFFF';
const screenWidth = Dimensions.get('window').width;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: secondaryColor,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primaryColor,
        margin: 20,
        textAlign: 'center',
    },
    homeContainer: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 10,
        width: screenWidth - 40,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: primaryColor,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: screenWidth - 40,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    searchIcon: {
        marginRight: 10,
    },
    footer: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        padding: 10,
    },
});

// Helper Function to Get Last Read Information
const getLastRead = async () => {
    try {
        const lastReadSurah = await AsyncStorage.getItem('lastReadSurah');
        const lastReadAyah = await AsyncStorage.getItem('lastReadAyah');
        return {
            surahNumber: lastReadSurah ? parseInt(lastReadSurah, 10) : null,
            ayahNumber: lastReadAyah ? parseInt(lastReadAyah, 10) : null,
        };
    } catch (error) {
        console.error('Error getting last read:', error);
        return { surahNumber: null, ayahNumber: null };
    }
};

function HomeScreen({ navigation }) {
    const [lastRead, setLastRead] = useState({ surahNumber: null, ayahNumber: null });

    useEffect(() => {
        const fetchLastRead = async () => {
            const storedLastRead = await getLastRead();
            setLastRead(storedLastRead);
        };

        fetchLastRead();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.homeContainer}>
                <Text style={styles.sectionTitle}>Welcome to Al-Quran Navigator</Text>

                <View style={styles.searchSection}>
                    <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Surah"
                        placeholderTextColor="gray"
                    />
                </View>

                <TouchableOpacity style={styles.card} onPress={() => {
                    if (lastRead.surahNumber !== null && lastRead.ayahNumber !== null) {
                        navigation.navigate('Surah', { number: lastRead.surahNumber, initialAyah: lastRead.ayahNumber });
                    } else {
                        alert('No last read found. Please read a Surah first.');
                    }
                }}>
                    <Text style={styles.cardTitle}>Last Read</Text>
                    {lastRead.surahNumber ? (
                        <Text style={styles.cardText}>
                            Surah: {lastRead.surahNumber}, Ayah: {lastRead.ayahNumber}
                        </Text>
                    ) : (
                        <Text style={styles.cardText}>No last read found.</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SurahIndex')}>
                    <Text style={styles.cardTitle}>Surah Index</Text>
                    <Text style={styles.cardText}>List of all Surahs in the Quran.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('JuzIndex')}>
                    <Text style={styles.cardTitle}>Juz Index</Text>
                    <Text style={styles.cardText}>Index of all 30 Juz in the Quran.</Text>
                </TouchableOpacity>
                <Text style={styles.footer}>
                    Powered by AlQuran.Cloud API
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;
