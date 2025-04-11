import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text>Resume</Text>
    </View>
  );
}

function JuzIndexScreen() {
  return (
    <View style={styles.center}>
      <Text>Juz Index</Text>
    </View>
  );
}

function SurahIndexScreen() {
  return (
    <View style={styles.center}>
      <Text>Surah Index</Text>
    </View>
  );
}

function GoToPageScreen() {
  return (
    <View style={styles.center}>
      <Text>Go To Page #</Text>
    </View>
  );
}

function BookmarksScreen() {
  return (
    <View style={styles.center}>
      <Text>Bookmarks</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.center}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App() {
  return (
    <NavigationContainer>
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
          tabBarActiveTintColor: 'royalblue',
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
    </NavigationContainer>
  );
}

export default App;
