import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {userService} from "../services/userService";

export default function RandomScreen() {

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;
    const [user, setUser] = useState(null);
    const [dataBoard, setDataBoard] = useState([]);
    const getUser = async () => {
        setUser(await userService.getUser())
        await getBoards();
    }
    useEffect(() => {
        getUser();
    }, []);

    const getWorkSpaces = async () =>{

    };

    const getBoards = async ()=>{
        let urlBoard = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`;
        let response = await fetch(urlBoard);
        setDataBoard(await response.json());
    };

    if (null === user) {
        return user;
    }
    return (
        <View>
            <Text>Bonjour {user.username}</Text>
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
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
}