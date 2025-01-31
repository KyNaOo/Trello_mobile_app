import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import List from '../component/List';
import StickyButtonComponent from '../component/StickyButton';
import OptionBoardEdit from "../component/OptionBoardEdit";

export default function Boards({route}) {
  const [trelloData, setTrelloData] = useState([]);
  const [cardData,setCardData] = useState([]);
  const [formValid,setFormValid] = useState(false);
  const [members,setMembers] = useState([])
  const {board} = route.params;

  const endUrl = `key=${process.env.EXPO_PUBLIC_API_KEY}&token=${process.env.EXPO_PUBLIC_API_TOKEN}`;

    //CRUD for List
    const addList = async (listName,url) => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/lists?name=${listName}&idBoard=${board.id}&${url}`,
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
        }else{
          setFormValid(!formValid)
        }
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    };

    const getAllList = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/boards/${board.id}/lists?${endUrl}&cards=all`
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

    const updateList = async (id,newName) => {
      try {
        // Replace 'listId' with the actual ID of the list you want to update
  
        const response = await fetch(
          `https://api.trello.com/1/lists/${id}?${endUrl}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: `${newName}`, // New name for the list
              closed:false
            }),
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }else{
          setFormValid(!formValid)
        }
        
      } catch (error) {
        console.error('Error making PUT request:', error.message);
      }
    };

    const closeList = async (id) => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/lists/${id}?${endUrl}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              closed:true
            }),
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }else{
          setFormValid(!formValid)
        }
      } catch (error) {
        console.error('Error making PUT request:', error.message);
      }
    };
    //
    //
    //
    //CRUD for cards
    const createCard = async (id,cardName) => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/cards?idList=${id}&${endUrl}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name:`${cardName}`,
              closed:true
            }),
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }else{
          setFormValid(!formValid)
        }
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    };

    const updateCard = async (id,cardName) => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/cards/${id}?${endUrl}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: `${cardName}`, // New name for the list
              closed:false
            }),
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }else{
          setFormValid(!formValid)
        }
        
      } catch (error) {
        console.error('Error making PUT request:', error.message);
      }
    };

    const closeCard = async (id) => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/cards/${id}?${endUrl}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }else{
          setFormValid(!formValid)
        }
      } catch (error) {
        console.error('Error making PUT request:', error.message);
      }
    };
    //
    //Members
    //
    const getMembers = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/organizations/${board.idOrganization}/members?${endUrl}`
        );
  
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }
  
        const data = await response.json();
        setMembers(data)
        
      } catch (error) {
        console.error('Error making GET request:', error.message);
      }
    };


    const isMember = async (idCard, idMember) => {
      
        try {
          const response = await fetch(
              `https://api.trello.com/1/cards/${idCard}?${endUrl}`
          );
  
          if (!response.ok) {
              console.error(`Error: ${response.status} ${response.statusText}`);
              return;
          }
  
          const data = await response.json();
  
          // Check if idMember exists in the idMembers array
          const isMemberr = data.idMembers.includes(idMember);
          if(isMemberr){      
            return true
          }
         
          return false
  
      } catch (error) {
          console.error('Error making GET request:', error.message);
      
      }
  };
  

    const assignMember = async (idCard,idMember) => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/cards/${idCard}/idMembers?${endUrl}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              value:`${idMember}`,
            }),
          }
        );
        if (!response.ok) {
          removeMember(idCard,idMember)
          setFormValid(!formValid)
        }else{
          setFormValid(!formValid)
        }
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    };

    const removeMember = async (idCard,idMember) => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/cards/${idCard}/idMembers/${idMember}?${endUrl}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
        );
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          return;
        }else{
          setFormValid(!formValid)
        }
      } catch (error) {
        console.error('Error making PUT request:', error.message);
      }
    };

    useEffect(() => {
      // Call the getAllList function when the component mounts
      getAllList();
      getMembers();
    }, [formValid, board]);

  return (
    <View>
    <StickyButtonComponent addList={addList}/>
      <OptionBoardEdit board={board} endUrl={endUrl}/>
      {/*<TouchableOpacity style={styles.title}>*/}
      {/*  <Text style={styles.titleTxt}>{board.name}</Text>*/}
      {/*</TouchableOpacity>*/}
    <List listData={trelloData} deleteList={closeList} updateList={updateList} createCard={createCard} updateCard={updateCard} deleteCard={closeCard} members={members} isMember={isMember} assignMember={assignMember} />
  </View>
  )
}
const styles = StyleSheet.create({
  title: {
    backgroundColor: '#D3D3D3',
    margin: 10,
    paddingLeft: 25,
    padding: 10,
    borderRadius: 4,
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  }
});