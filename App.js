import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RandomScreen from './screens/RandomScreen';
import RandomScreen2 from './screens/RandomScreen2';
import RandomScreen3 from './screens/RandomScreen3';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
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
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
       
      <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Text style={{fonSize: 12, color: "#16247d"}}>HOME</Text>
            </View>
              )
            }
          }}
          />
       <Tab.Screen name = "Random" component={RandomScreen} options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Text style={{fonSize: 12, color: "#16247d"}}>Random1</Text>
            </View>
              )
            }
          }}/>
       <Tab.Screen name = "Random2" component={RandomScreen2} options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Text style={{fonSize: 12, color: "#16247d"}}>Random2</Text>
            </View>
              )
            }
          }}/>
       <Tab.Screen name = "Random3" component={RandomScreen3}options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Text style={{fonSize: 12, color: "#16247d"}}>Random3</Text>
            </View>
              )
            }
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
