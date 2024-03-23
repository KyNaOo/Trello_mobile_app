import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function RandomScreen3() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title1}>Workspaces</Text>
        <Text style={styles.instructions}>
               Create a Workspace  
        </Text>
        <Text>
        {` by clicking the blue button at the top of the screen.`} 
        </Text>  
      <Text style={styles.instructions}>
        Edit your workspace
      </Text>
      <Text>
        {` by clicking the three dots inside your workspace. You can
 now rename, delete you workspace, and add a board with 
                or without a kanban to your workspace
        `} 
      </Text> 

      <Text style={styles.title}>Boards</Text>
        <Text style={styles.instructions}>
               Create a Board 
        </Text>
        <Text>
        {` Watch workspaces documentation`} 
        </Text>  
      <Text style={styles.instructions}>
        Edit your Board
      </Text>
      <Text>
        {` Once the board is created, go inside the board by cliking 
        it. You can now edit it by clicking the three dots like 
           workspaces but this time you can add a List ! 
        `} 
      </Text> 

      <Text style={styles.title}>Lists</Text>
        <Text style={styles.instructions}>
               Create a List
        </Text>
        <Text>
        {` Watch Boards documentation`} 
        </Text>  
      <Text style={styles.instructions}>
        Edit your List
      </Text>
      <Text>
        {`   Once the list is created, You can now edit it by clicking
  the three dots like workspaces and boards but this time 
                               you can add a card !  
        `} 
      </Text> 

      <Text style={styles.title}>Cards</Text>
        <Text style={styles.instructions}>
               Create a Card
        </Text>
        <Text>
        {` Watch Lists documentation`} 
        </Text>  
      <Text style={styles.instructions}>
        Edit your Card
      </Text>
      <Text>
          This one is very tricky
        
      </Text> 
      <Text style={styles.instructions}>
        Rename your Card
      </Text>
      <Text>
          Tap at the very top edges of the card
      </Text>

      <Text style={styles.instructions}>
        Delete your Card
      </Text>
      <Text>
          Double tap quickly the card name
      </Text>

      <Text style={styles.instructions}>
        Link your Card to a member
      </Text>
      <Text style={styles.lastText}>
          {`Simply tap the Link Icon, and select the member
                          you want to link`}
      </Text>
      
    </View>
    </ScrollView>
  )
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20, // Adjust font size as needed
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5, // Add spacing between titles and content
  },
  instructions: {
    fontStyle: 'italic',
    fontWeight:'bold',
    color: '#42b883',
    marginBottom:5,
    marginTop: 5, // Add spacing between titles and content
  },
  title1: {
    fontSize: 20, // Adjust font size as needed
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5, // Add spacing between titles and content
    marginTop:30
  },

  lastText:{
    marginBottom:30
  }
});

