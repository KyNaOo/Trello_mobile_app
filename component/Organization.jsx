import React, {useEffect, useState} from 'react';
import {Button, Pressable, ScrollView, Text} from "react-native";

const Organization = props => {
    //console.warn(props.organization)
    const [dataBoards, setDataBoards] = useState([]);
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;

    const getBoardsOfOrga = async () =>{
        let urlBoards = `https://api.trello.com/1/organizations/${props.organization.id}/boards?${props.endUrl}`
        const response = await fetch(urlBoards);
        const boards = await response.json();
        setDataBoards(boards)
        // console.warn(dataBoards)
    }

    useEffect(() => {
        getBoardsOfOrga()
    }, []);
    return (
        <ScrollView>
            <Button title={props.organization.displayName} id={props.organization.id} />
            {dataBoards && dataBoards.map((board) => {
                return (
                    <Text id={board.id}>{board.name}</Text>
                );
            })}

        </ScrollView>
    );
};

export default Organization;