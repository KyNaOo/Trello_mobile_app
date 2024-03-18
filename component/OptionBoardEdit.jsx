import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import Update from "./Update";
import ModalOneField from "./ModalOneField";
import modalOneField from "./ModalOneField";
import {Entypo} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const OptionBoardEdit = props => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [formValid, setFormValid] = useState(false)
    const navigation = useNavigation();


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
        const data = await response.json();
        props.board.name = data.name
        setModalVisible(false);
        if (response.ok){
            setFormValid(!formValid)
        } else if(response.status === 401){
            Alert.alert('Unauthorized', 'You don\'t have the rights to rename this board')
        } else {
            console.warn("Error with the request")
        }
    }

    const openBoardScreen = (board) => {
        navigation.navigate('Random')
    }


    return (
        // <TouchableOpacity>
        <View>
            <TouchableOpacity style={styles.row} onPress={() => openBoardScreen()}>
                <Entypo name="chevron-thin-left" size={30} color="black"/>
                <Text>Back to the organizations</Text>
            </TouchableOpacity>
            <Menu>
            <MenuTrigger>
                <View style={styles.title}>
                  <Text style={styles.titleTxt}>{props.board.name}</Text>
                    <Entypo name="dots-three-horizontal" size={30} color="black" />
                </View>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => {
                    setModalVisible(true)
                }} text="Rename" />
                <MenuOption onSelect={() => props.delete(props.board.id)} text="Delete" />
            </MenuOptions>
            </Menu>
            <ModalOneField renameBoard={renameBoard} modalVisible={isModalVisible} setModalVisible={setModalVisible}/>
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