import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar/build/StatusBar";
import TopBar from "./component/TopBar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RandomScreen from './screens/RandomScreen';
import RandomScreen2 from './screens/RandomScreen2';
import RandomScreen3 from './screens/RandomScreen3';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect} from "react";
import {userService} from "./services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    useEffect(() => {
        const fetchMe = async () => {
            const response = await fetch(`https://api.trello.com/1/members/me/?key=${process.env.EXPO_PUBLIC_API_KEY}&token=${process.env.EXPO_PUBLIC_API_TOKEN}`);
            const user = await response.json();
            if (response.ok) {
                userService.saveUser(user);
            }
        }
        if (false === userService.isLogged()) {
            fetchMe()
        }
    }, []);


    return (
        <>
            <TopBar />
            <NavigationContainer>
                <Tab.Navigator screenOptions={screenOptions}>

                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <Text style={{fontSize: 12, color: "#16247d"}}>HOME</Text>
                                    </View>
                                )
                            }
                        }}
                    />
                    <Tab.Screen name="Random" component={RandomScreen} options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{fontSize: 12, color: "#16247d"}}>Random1</Text>
                                </View>
                            )
                        }
                    }}/>
                    <Tab.Screen name="Random2" component={RandomScreen2} options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{fontSize: 12, color: "#16247d"}}>Random2</Text>
                                </View>
                            )
                        }
                    }}/>
                    <Tab.Screen name="Random3" component={RandomScreen3} options={{
                        tabBarIcon: ({focused}) => {
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{fontSize: 12, color: "#16247d"}}>Random3</Text>
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
