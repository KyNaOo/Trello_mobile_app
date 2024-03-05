import {StatusBar} from "expo-status-bar/build/StatusBar";
import TopBar from "./component/TopBar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Workspaces from './screens/Workspaces';
import RandomScreen2 from './screens/RandomScreen2';
import RandomScreen3 from './screens/RandomScreen3';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect, useState} from "react";
import {userService} from "./services/userService";
import {Button, StyleSheet, Text, View} from 'react-native';
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
        height: 60,
        background: "#fff"
    }
}
export default function App() {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
    const [user, setUser] = useState(null)
    const getUser = async () => {
        setUser(await userService.getUser())
    }
    const endUrl = `?key=${apiKey}&token=${apiToken}`
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
            fetchMe();
        }
    }, []);

    return (
        <>
            <TopBar/>
            <NavigationContainer>
                <Tab.Navigator screenOptions={screenOptions}>

                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <Entypo name="home" size={focused ? 30 : 24} color={focused? '#00171F' : '#003459'}/>
                                        <Text style={{fontSize: 12, color: "#16247d"}}>Home</Text>
                                    </View>
                                )
                            }
                        }}
                    />
                    <Tab.Screen name="Random" component={Workspaces} options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Entypo name="blackboard" size={focused ? 30 : 24} color={focused? '#00171F' : '#003459'} />
                                    <Text style={{fontSize: 12, color: "#16247d"}}>Board</Text>
                                </View>
                            )
                        }
                    }}/>
                    <Tab.Screen name="Random2" component={RandomScreen2} options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Ionicons name="settings" size={focused ? 30 : 24} color={focused? '#00171F' : '#003459'} />
                                    <Text style={{fontSize: 12, color: "#16247d"}}>Settings</Text>
                                </View>
                            )
                        }
                    }}/>
                    <Tab.Screen name="Random3" component={RandomScreen3} options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Ionicons name="person" size={focused ? 30 : 24} color={focused? '#00171F' : '#003459'}/>
                                    <Text style={{fontSize: 12, color: "#16247d"}}>Profil</Text>
                                </View>
                            )
                        }
                    }}/>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style={"light"}/>
        </>
    );
}
