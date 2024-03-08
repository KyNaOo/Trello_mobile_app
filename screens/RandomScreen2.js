import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import List from '../component/List';
import StickyButtonComponent from '../component/StickyButton';

export default function RandomScreen2() {
  const [trelloData, setTrelloData] = useState([]);
  const [cardData,setCardData] = useState([]);
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
          `https://api.trello.com/1/boards/65e7225541349e9de197c3df/lists?${endUrl}&cards=all`
        );
  
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
  
        const data = await response.json();
        setTrelloData(data);
        
      } catch (error) {
        console.error('Error making GET request:', error.message);
      }
    };

    const updateList = async () => {
      try {
        // Replace 'listId' with the actual ID of the list you want to update
        const listId = '65e72656763aa5dfd17518e6';
  
        const response = await fetch(
          `https://api.trello.com/1/lists/${listId}?${endUrl}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: 'damn', // New name for the list
              closed:false
            }),
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const updatedList = await response.json();
        console.warn(updatedList);
      } catch (error) {
        console.error('Error making PUT request:', error.message);
      }
    };

    const closeList = async () => {
      try {
        // Replace 'listId' with the actual ID of the list you want to update
        const listId = '65e72656763aa5dfd17518e6';
  
        const response = await fetch(
          `https://api.trello.com/1/lists/${listId}?${endUrl}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: 'damn', // New name for the list
              closed:true
            }),
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
        const updatedList = await response.json();
        console.warn(updatedList);
      } catch (error) {
        console.error('Error making PUT request:', error.message);
      }
    };

    useEffect(() => {
      // Call the getAllList function when the component mounts
      getAllList();
    }, []);
/*
    <TextInput
    placeholder="Enter List Name"
    value={addlistName}
    onChangeText={(text) => setAddListName(text)}
  />
  <Button title="New list" onPress={addList} />
  */
  return (
    <View>
    <List listData={trelloData}/>
    <StickyButtonComponent/>
  </View>
  )
}