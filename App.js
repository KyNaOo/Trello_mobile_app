import {Dimensions,StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar/build/StatusBar";
import TopBar from "./component/TopBar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RandomScreen from './screens/RandomScreen';
import RandomScreen2 from './screens/RandomScreen2';
import RandomScreen3 from './screens/RandomScreen3';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect, useState} from "react";
import {userService} from "./services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        paddingTop: 10,
        height: Dimensions.get('window').height * 0.1,
        background: "#fff"
    }
}

const tabBarIconStyle = {
    alignItems: "center",
    justifyContent: "center",
};

const iconTextStyle = {
    fontSize: 12,
    color: "#16247d",
};

const tabScreenOptions = (iconLibrary, iconName, Name) => ({
    tabBarIcon: ({focused}) => (
        <View style={tabBarIconStyle}>
            {iconLibrary === 'Ionicons' && (
                <Ionicons
                    name={iconName}
                    size={focused ? 30 : 24}
                    color={focused ? '#007EA7' : '#808B8F'}
                />
            )}
            {iconLibrary === 'Entypo' && (
                <Entypo
                    name={iconName}
                    size={focused ? 30 : 24}
                    color={focused ? '#007EA7' : '#808B8F'}
                />
            )}
            <Text style={iconTextStyle}>{Name}</Text>
        </View>
    ),
});
export default function App() {
    const [user, setUser] = useState(null)
    const getUser = async () => {
        setUser(await userService.getUser())
    }
    const endUrl = `?key=${process.env.EXPO_PUBLIC_API_KEY}&token=${process.env.EXPO_PUBLIC_API_TOKEN}`
    useEffect( () => {
        const fetchMe = async () => {
            const response = await fetch(`https://api.trello.com/1/members/me/${endUrl}`);
            const userRes = await response.json();
            if (response.ok) {
                await userService.saveUser(userRes);
                await getUser();
            }
        }
        if (user === null) {
            fetchMe()
        }
    }, []);

    return (
        <>
            <TopBar/>
            <NavigationContainer>
                <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="Home" component={HomeScreen} options={tabScreenOptions('Entypo', 'home','Home')} />
                <Tab.Screen name="Random" component={RandomScreen} options={tabScreenOptions('Entypo', 'blackboard','Board')} />
                <Tab.Screen name="Random2" component={RandomScreen2} options={tabScreenOptions('Ionicons', 'settings', 'Settings')} />
                <Tab.Screen name="Random3" component={RandomScreen3} options={tabScreenOptions('Ionicons', 'person', 'Profile')} />
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style={"light"}/>
        </>
    );
}
