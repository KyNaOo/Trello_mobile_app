import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import React from 'react'

export default function HomeScreen() {
const navigation = useNavigation()
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Text>HomeScreen</Text>
    </View>
  )
}