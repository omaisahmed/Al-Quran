import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text, Button, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './components/splash';
import { getSurahList, getJuzList, getPage } from './src/services/quran-text';

const Tab = createBottomTabNavigator();

// Styling constants
const primaryColor = '#4169E1';
const secondaryColor = '#FFFFFF';
const accentColor = 'green';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: secondaryColor,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: primaryColor,
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    pageContainer: {
        padding: 10,
    },
    verse: {
        fontSize: 20,
        lineHeight: 30,
        textAlign: 'justify',
    },
});

// Dummy Data for Quran Integration
const dummyQuranData = {
    1: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    2: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
    3: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    4: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
    5: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
};

// HomeScreen (Resume)
function HomeScreen() {
    const [lastReadPage, setLastReadPage] = useState(1); // Initialize with a default value (page 1)

    const handleGoToLastRead = () => {
        // Implement navigation to the last read page here
        alert(`Navigating to last read page: ${lastReadPage}`);
    };

    return (
        <View style={styles.center}>
            <Text>Resume</Text>
            <Text>Last Read Page: {lastReadPage}</Text>
            <Button title="Go to Last Read" onPress={handleGoToLastRead} color={primaryColor} />
        </View>
    );
}

// JuzIndexScreen
function JuzIndexScreen() {
    const [juzList, setJuzList] = useState([]);

    useEffect(() => {
        const fetchJuzList = async () => {
            try {
                const data = await getJuzList();
                setJuzList(data);
            } catch (error) {
                console.error("Error fetching Juz list:", error);
                // Optionally set an error state to display an error message to the user
            }
        };

        fetchJuzList();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Juz Index</Text>
            <ScrollView>
                {juzList.map((juz, index) => (
                    <Text key={index} style={styles.item}>
                        Juz {juz.juzNumber}: Surah {juz.surahName} (Verse {juz.startVerse})
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

// SurahIndexScreen
function SurahIndexScreen() {
    const [surahList, setSurahList] = useState([]);

    useEffect(() => {
        const fetchSurahList = async () => {
            try {
                const data = await getSurahList();
                setSurahList(data);
            } catch (error) {
                console.error("Error fetching Surah list:", error);
                // Optionally set an error state to display an error message to the user
            }
        };

        fetchSurahList();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Surah Index</Text>
            <ScrollView>
                {surahList.map((surah, index) => (
                    <Text key={index} style={styles.item}>
                        Surah {surah.number}: {surah.name} ({surah.englishName}) - {surah.ayahs} verses
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

// GoToPageScreen
function GoToPageScreen() {
    const [pageNumber, setPageNumber] = useState('');
    const [pageContent, setPageContent] = useState({});
    const [error, setError] = useState('');

    const goToPage = async () => {
        try {
            const page = parseInt(pageNumber, 10);
            if (isNaN(page) || page <= 0) {
                setError('Please enter a valid page number.');
                setPageContent({});
                return;
            }

            const data = await getPage(page);

            if (data && Object.keys(data).length > 0) {
                setPageContent(data);
                setError('');
            } else {
                setError('Page not found.');
                setPageContent({});
            }
        } catch (err) {
            console.error("Error fetching page:", err);
            setError('Failed to load page. Please try again.');
            setPageContent({});
        }
    };

    return (
        <SafeAreaView style={styles.pageContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter Page Number"
                keyboardType="number-pad"
                value={pageNumber}
                onChangeText={setPageNumber}
            />
            <Button title="Go To Page" onPress={goToPage} color={primaryColor} />

            {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}

            {Object.keys(pageContent).length > 0 && (
                <ScrollView>
                    {Object.entries(pageContent).map(([verseNumber, verseText]) => (
                        <Text key={verseNumber} style={styles.verse}>
                            {verseNumber}. {verseText}
                        </Text>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

// BookmarksScreen
function BookmarksScreen() {
    const [bookmarks, setBookmarks] = useState([]);

    const addBookmark = (pageNumber) => {
        setBookmarks([...bookmarks, { page: pageNumber, timestamp: new Date() }]);
    };

    const removeBookmark = (index) => {
        const newBookmarks = [...bookmarks];
        newBookmarks.splice(index, 1);
        setBookmarks(newBookmarks);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bookmarks</Text>
            <ScrollView>
                {bookmarks.map((bookmark, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={styles.item}>Page {bookmark.page}</Text>
                        <Button title="Remove" onPress={() => removeBookmark(index)} color={accentColor} />
                    </View>
                ))}
                <Button title="Add Bookmark" onPress={() => addBookmark(Math.floor(Math.random() * 604) + 1)} color={primaryColor} />
            </ScrollView>
        </View>
    );
}

// SettingsScreen
function SettingsScreen() {
    const [fontSize, setFontSize] = useState(18);

    return (
        <View style={styles.settingsContainer}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Font Size</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button title="-" onPress={() => setFontSize(Math.max(12, fontSize - 2))} color={primaryColor} />
                    <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{fontSize}px</Text>
                    <Button title="+" onPress={() => setFontSize(Math.min(24, fontSize + 2))} color={primaryColor} />
                </View>
            </View>

            {/* Add more settings here as needed */}
        </View>
    );
}

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowSplash(false);
        }, 3000); // Splash screen visible for 3 seconds
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {showSplash ? (
                    <SplashScreen />
                ) : (
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                switch (route.name) {
                                    case 'Resume':
                                        iconName = 'home';
                                        break;
                                    case 'Juz Index':
                                        iconName = 'list';
                                        break;
                                    case 'Surah Index':
                                        iconName = 'list';
                                        break;
                                    case 'Go To Page #':
                                        iconName = 'search';
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

                                return <Icon name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: primaryColor,
                            tabBarInactiveTintColor: 'gray',
                        })}
                    >
                        <Tab.Screen name="Resume" component={HomeScreen} />
                        <Tab.Screen name="Juz Index" component={JuzIndexScreen} />
                        <Tab.Screen name="Surah Index" component={SurahIndexScreen} />
                        <Tab.Screen name="Go To Page #" component={GoToPageScreen} />
                        <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
                        <Tab.Screen name="Settings" component={SettingsScreen} />
                    </Tab.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
