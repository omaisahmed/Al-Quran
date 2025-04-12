import React, { useState, useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from './components/splash';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const primaryColor = '#4169E1';
const secondaryColor = '#FFFFFF';
const accentColor = 'green';
const screenWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: secondaryColor,
    },
    header: {
        backgroundColor: primaryColor,
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: secondaryColor,
    },
    tabLabel: {
        fontSize: 12,
        color: primaryColor,
    },
    tabIcon: {
        marginBottom: -5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primaryColor,
        margin: 20,
        textAlign: 'center',
    },
    listItem: {
        padding: 15,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: 'black',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
    },
    pageContainer: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    verse: {
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'justify',
    },
    //New Styles
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        padding: 10,
    },
    settingsContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: secondaryColor,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    settingText: {
        fontSize: 18,
        color: 'black',
    },
});

// API functions
const getSurahList = async () => {
    try {
        const response = await fetch('https://alquran.cloud/api/quran/en.asad');
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching Surah list:", error);
        return [];
    }
};

const getSurah = async (number) => {
    try {
        const response = await fetch(`https://alquran.cloud/api/surah/${number}`);
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching Surah:", error);
        return null;
    }
};

// Helper Function to Save Last Read Information
const saveLastRead = async (surahNumber, ayahNumber) => {
    try {
        await AsyncStorage.setItem('lastReadSurah', surahNumber.toString());
        await AsyncStorage.setItem('lastReadAyah', ayahNumber.toString());
        console.log('Last read saved successfully');
    } catch (error) {
        console.error('Error saving last read:', error);
    }
};

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

// Components
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

function SurahIndexScreen({ navigation }) {
    const [surahList, setSurahList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurahList = async () => {
            const data = await getSurahList();
            setSurahList(data);
            setLoading(false);
        };

        fetchSurahList();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={primaryColor} />
                <Text>Loading Surah Index...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {surahList.map((surah) => (
                    <TouchableOpacity
                        key={surah.number}
                        onPress={() => navigation.navigate('Surah', { number: surah.number })}
                    >
                        <Text style={styles.listItem}>
                            {surah.number}. {surah.englishName} ({surah.name}) - {surah.ayahs} verses
                        </Text>
                    </TouchableOpacity>
                ))}
                <Text style={styles.footer}>
                    Powered by AlQuran.Cloud API
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

function SurahScreen({ route, navigation }) {
    const { number, initialAyah } = route.params;
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentAyah, setCurrentAyah] = useState(initialAyah || 1); // Track current ayah

    useEffect(() => {
        const fetchSurah = async () => {
            const data = await getSurah(number);
            setSurah(data);
            setLoading(false);
        };

        fetchSurah();
    }, [number]);

    const saveAndGoBack = useCallback(async (surahNumber, ayahNumber) => {
        await saveLastRead(surahNumber, ayahNumber);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: surah ? surah.englishName : 'Loading...',
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        if (surah) {
                            saveAndGoBack(surah.number, currentAyah);
                            navigation.goBack();
                        }
                    }}
                    style={{ marginRight: 15 }}
                >
                    <Icon name="bookmark" size={24} color={secondaryColor} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, surah, currentAyah, saveAndGoBack]); // Include saveAndGoBack

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={primaryColor} />
                <Text>Loading Surah...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {surah.ayahs.map((ayah, index) => (
                    <View key={ayah.number} style={{ padding: 10, backgroundColor: index + 1 === currentAyah ? '#e0e0e0' : 'transparent' }}>
                        <Text style={{ fontSize: 24, lineHeight: 40, marginBottom: 10, color: 'black' }}>
                            {ayah.text}
                        </Text>
                        <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>
                            {ayah.numberInSurah}. {ayah.text}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (currentAyah > 1) {
                            setCurrentAyah(currentAyah - 1);
                        }
                    }}
                    style={{ backgroundColor: primaryColor, padding: 10, borderRadius: 5 }}
                >
                    <Text style={{ color: secondaryColor }}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (currentAyah < surah.ayahs.length) {
                            setCurrentAyah(currentAyah + 1);
                        }
                    }}
                    style={{ backgroundColor: primaryColor, padding: 10, borderRadius: 5 }}
                >
                    <Text style={{ color: secondaryColor }}>Next</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.footer}>
                Powered by AlQuran.Cloud API
            </Text>
        </SafeAreaView>
    );
}

function JuzIndexScreen() {
    const juzList = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {juzList.map((juz) => (
                    <TouchableOpacity key={juz}>
                        <Text style={styles.listItem}>Juz {juz}</Text>
                    </TouchableOpacity>
                ))}
                <Text style={styles.footer}>
                    Powered by AlQuran.Cloud API
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

// Placeholder for Bookmarks and Settings
function BookmarksScreen() {
    return (
        <View style={styles.center}>
            <Text>Bookmarks Screen</Text>
        </View>
    );
}

function SettingsScreen() {
    const [fontSize, setFontSize] = useState(18);

    return (
        <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Font Size</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setFontSize(Math.max(12, fontSize - 2))} style={{ backgroundColor: primaryColor, padding: 5, borderRadius: 5 }}>
                        <Text style={{ color: secondaryColor }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{fontSize}px</Text>
                    <TouchableOpacity onPress={() => setFontSize(Math.min(24, fontSize + 2))} style={{ backgroundColor: primaryColor, padding: 5, borderRadius: 5 }}>
                        <Text style={{ color: secondaryColor }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowSplash(false);
        }, 3000);
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar style="light" backgroundColor={primaryColor} />
            <NavigationContainer>
                {showSplash ? (
                    <SplashScreen />
                ) : (
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                switch (route.name) {
                                    case 'Home':
                                        iconName = 'home';
                                        break;
                                    case 'SurahIndex':
                                        iconName = 'list';
                                        break;
                                    case 'JuzIndex':
                                        iconName = 'th-list';
                                        break;
                                    case 'Bookmarks':
                                        iconName = 'bookmark';
                                        break;
                                    case 'Settings':
                                        iconName = 'gear';
                                        break;
                                    default:
                                        iconName = 'question-circle';
                                }

                                return <Icon name={iconName} size={size} color={color} style={styles.tabIcon} />;
                            },
                            tabBarActiveTintColor: primaryColor,
                            tabBarInactiveTintColor: 'gray',
                            tabBarStyle: {
                                backgroundColor: secondaryColor,
                            },
                            tabBarLabelStyle: styles.tabLabel,
                            headerStyle: {
                                backgroundColor: primaryColor,
                            },
                            headerTintColor: secondaryColor,
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        })}
                    >
                        <Tab.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                headerTitle: 'Al-Quran Navigator',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                    fontSize: 24,
                                    color: secondaryColor,
                                },
                            }}
                        />
                        <Tab.Screen name="SurahIndex" component={SurahIndexScreen} options={{ title: 'Surah Index' }} />
                        <Tab.Screen name="Surah" component={SurahScreen} options={({ route }) => ({
                            title: route.params?.number ? `Surah ${route.params.number}` : 'Surah',
                        })} />
                        <Tab.Screen name="JuzIndex" component={JuzIndexScreen} options={{ title: 'Juz Index' }} />
                        <Tab.Screen name="Bookmarks" component={BookmarksScreen} options={{ title: 'Bookmarks' }} />
                        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
                    </Tab.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;

