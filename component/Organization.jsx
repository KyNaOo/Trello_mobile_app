import React, {useEffect, useState} from 'react';
import {Button, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import Update from "./Update";

const Organization = props => {
    //console.warn(props.organization)
    const [dataBoards, setDataBoards] = useState([]);

    const getBoardsOfOrga = async () =>{
        let urlBoards = `https://api.trello.com/1/organizations/${props.organization.id}/boards?${props.endUrl}`
        const response = await fetch(urlBoards);
        const boards = await response.json();
        setDataBoards(boards)
        // console.warn(dataBoards)
    }

    useEffect(() => {
        getBoardsOfOrga()
    }, [props.formValid]);
    return (
        <View style={styles.container} key={props.organization.id}>
            <Text style={styles.orgaName}>{props.organization.displayName}</Text>
            <Update endUrl={props.endUrl} organization={props.organization} getOrga={props.getOrga}></Update>

                {dataBoards && dataBoards.map((board) => {
                    return (
                        <View style={styles.containerBoard}>
                            <Text id={board.id} >{board.name}</Text>
                        </View>
                    );
                })}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    containerBoard: {
        backgroundColor: '#D3D3D3',
        margin: 10,
        paddingLeft: 25,
        padding: 10,
        borderRadius: 4
    },
    orga: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        marginVertical: 10,
        padding: 15,
    },
    orgaName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Organization;