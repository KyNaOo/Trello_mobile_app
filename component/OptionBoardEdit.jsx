import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import ModalOneField from "./ModalOneField";
import {Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const OptionBoardEdit = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [currentName, setCurrentName] = useState(props.board.name)

    const renameBoard = async (addName) => {
        const url = `https://api.trello.com/1/boards/${props.board.id}?name=${addName}&${props.endUrl}`;
        const response = await fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        setModalVisible(false);
        if (response.ok) {
            const data = await response.json();
            props.board.name = data.name
            setCurrentName(data.name)
        } else if (response.status === 401) {
            Alert.alert('Unauthorized', 'You don\'t have the rights to rename this board')
        } else {
            console.warn("Error with the request")
        }
    }
    const deleteBoard = async () => {
        const url = `https://api.trello.com/1/boards/${props.board.id}?${props.endUrl}`;
        const response = await fetch(url,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
        if (response.ok) {
            openBoardScreen()
        } else if (response.status === 401) {
                Alert.alert('Unauthorized', 'You don\'t have the rights to delete this board')
            } else {
                console.warn("Error with the request")
            }
    }
    useEffect(() => {
        setCurrentName(props.board.name)
    }, [props.board]);
    const openBoardScreen = () => {
        navigation.navigate('Random')
    }
    return (
        // <TouchableOpacity>
        <View>
            <TouchableOpacity style={styles.row} onPress={() => openBoardScreen()}>
                <Entypo name="chevron-thin-left" size={25} color="black"/>
                <Text>Back</Text>
            </TouchableOpacity>
            <Menu>
            <MenuTrigger>
                <View style={styles.title}>
                  <Text style={styles.titleTxt}>{currentName}</Text>
                    <Entypo name="dots-three-horizontal" size={30} color="black" />
                </View>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => {
                    setModalVisible(true)
                }} text="Rename" />
                <MenuOption onSelect={() => deleteBoard()} text="Delete" />
            </MenuOptions>
            </Menu>
            <ModalOneField renameBoard={renameBoard} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>

        // </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    title: {
        backgroundColor: '#D3D3D3',
        margin: 10,
        paddingLeft: 25,
        padding: 10,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    row: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        width: 200,
    },
});
export default OptionBoardEdit;