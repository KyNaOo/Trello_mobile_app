import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';

export default function RandomScreen2() {
  const [trelloData, setTrelloData] = useState([]);
  const [addlistName, setAddListName] = useState('');
  const endUrl = `key=${process.env.EXPO_PUBLIC_API_KEY}&token=${process.env.EXPO_PUBLIC_API_TOKEN}`;

    const addList = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/lists?name=${addlistName}&idBoard=65e7225541349e9de197c3df&${endUrl}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            // Add any additional headers or body data as needed
            // body: JSON.stringify({ key: 'value' }),
          }
        );
  
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    };

    const getAllList = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/boards/65e7225541349e9de197c3df/lists?${endUrl}`
        );
  
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
  
        const data = await response.json();
        console.warn(data);
        setTrelloData(data);
        
      } catch (error) {
        console.error('Error making GET request:', error.message);
      }
    };
      
    useEffect(() => {
      // Call the getAllList function when the component mounts
      getAllList();
    }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <TextInput
      placeholder="Enter List Name"
      value={addlistName}
      onChangeText={(text) => setAddListName(text)}
    />
    <Button title="New list" onPress={addList} />
    <Button title="Get all Lists" onPress={getAllList} />

    {trelloData.length > 0 && (
        <Text>{trelloData[0].name}</Text>
      )}
  </View>
  )
}