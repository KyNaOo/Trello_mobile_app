import {Dimensions,StyleSheet, Text, View} from 'react-native';
import {StatusBar} from "expo-status-bar/build/StatusBar";
import TopBar from "./component/TopBar";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Workspaces from './screens/Workspaces';
import Documentation from './screens/Documentation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect, useState} from "react";
import {userService} from "./services/userService";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MenuProvider } from 'react-native-popup-menu';
import Boards from './screens/Boards'
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "fixed",
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

function Home() {
    return (

        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Random" component={Workspaces} options={tabScreenOptions('Entypo', 'blackboard','Board')} />
          <Tab.Screen name="Random3" component={Documentation} options={tabScreenOptions('Ionicons', 'information-circle', 'Documentation')} />
        </ Tab.Navigator>
    )
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
        <MenuProvider>
            <TopBar/>
            <NavigationContainer>          
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                    <Stack.Screen name={"List"} component={Boards} options={{}}/>
                </Stack.Navigator>
            </NavigationContainer>                
            <StatusBar style={"light"}/>
            </MenuProvider>
        </>
    );
}
