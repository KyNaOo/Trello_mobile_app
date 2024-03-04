import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";

export default function App() {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
  const [dataUser, setDataUser] = useState(undefined);
  const [dataBoard, setDataBoard] = useState([]);

  const getBoards = async ()=>{
    let urlBoard = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`;
    let response = await fetch(urlBoard);
    setDataBoard(await response.json());
  };
  const getConnectedUser = async () => {
    const urlMe = `https://api.trello.com/1/members/me/?key=${apiKey}&token=${apiToken}`;
    let result = await fetch(urlMe);
    let response = await result.json();
    setDataUser(response);
    getBoards()
  }
  useEffect(() => {
    getConnectedUser();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Bonjour {dataUser.username}</Text>
      {
        dataBoard ?
            <View>
              <Text>{dataBoard.map((board) => {
                return (<Button title={board.name}></Button>);
              })}</Text>
            </View>
            :
            <Text>Vous n'avez pas de tableau</Text>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
