import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Edit from "./edit";
import {useNavigation} from "@react-navigation/native";

const Organization = props => {
    const [dataBoards, setDataBoards] = useState([]);
    const [deleteState, setDeleteState] = useState(false)
    const navigation = useNavigation();
    const imAddingBoard='hey';


    const getBoardsOfOrga = async () =>{
        let urlBoards = `https://api.trello.com/1/organizations/${props.organization.id}/boards?${props.endUrl}`
        const response = await fetch(urlBoards);
        const boards = await response.json();
        setDataBoards(boards)
    }

    const deleteOrga = async () => {
        const url = `https://api.trello.com/1/organizations/${props.organization.id}?${props.endUrl}`
        const response = await fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // Add any additional headers or body data as needed
                // body: JSON.stringify({ key: 'value' }),
            }
            )
        if (response.ok){
            setDeleteState(!deleteState);
            props.setFormValid(!props.formValid);
        } else {
            console.warn("Error with the delete function")
        }
    }

    const openBoardScreen = (board) => {
        navigation.navigate('List', {board: board})
    }

    useEffect(() => {
        getBoardsOfOrga()
        props.getOrga()
    }, [props.formValid, deleteState, props.tokenRefresh]);

    return (
        <View style={styles.container} key={props.organization.id}>
            <View style={styles.headerContainer}>
            <Text style={styles.orgaName}>{props.organization.displayName}</Text>
            <Edit addKanban={props.addKanban} imAddingBoard={imAddingBoard} id={props.organization.id} delete={deleteOrga} getOrga={props.getOrga} endUrl={props.endUrl} getBoards={getBoardsOfOrga} update={props.update} add={props.add}/>
            </View>
                {dataBoards && dataBoards.map((board) => {
                    return (
                        <TouchableOpacity style={styles.containerBoard} onPress={() => openBoardScreen(board)}>
                            <Text id={board.id} >{board.name}</Text>
                        </TouchableOpacity>
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Organization;