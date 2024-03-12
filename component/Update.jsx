import React, {useEffect, useState} from 'react';
import {View, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {useRoute} from "@react-navigation/native";


const Update = props => {
    const [actionName, setActionName] = useState('');
    const [formValid, setFormValid] = useState(false)
    const [askLbl, setAskLbl] = useState('')

    const route = useRoute()
    const currentScreen = route.name;
    const loadTxt = () => {
        switch (currentScreen) {
            case 'Random':
                switch (props.action){
                    case 'Rename':
                        setAskLbl('Rename your organization :');
                        break;
                    case 'Add':
                        setAskLbl('Add a new board :');
                        break;
                    default:
                        break;
                }
                break;
            case 'Random2':
                switch (props.action){
                    case 'Rename':
                        setAskLbl('Rename your list :');
                        break;
                    case 'Add':
                        setAskLbl('Add a card :');
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    const handleConfirm = async () => {
        switch (props.action) {
            case 'Rename':
                await update();
                break;
            case 'Add':
                await add();
                break;
            default:
                break;
        }
    }

    const update = async () => {
        // console.warn(updateWorkspaceName)
        let url = `https://api.trello.com/1/organizations/${props.organization}?displayName=${actionName}&${props.endUrl}`
        let response = await fetch(url,{
            method: 'PUT'
        });
        console.warn("you are updating the name")
        if (response.ok){
            setFormValid(!formValid);
            props.getOrga()
            props.setActionClicked(false);
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    }

    const add = async () => {
        const url = `https://api.trello.com/1/boards/?name=${actionName}&idOrganization=${props.organization}&${props.endUrl}`
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        )
        if (response.ok){
            setFormValid(!formValid)
            props.getOrga()
            props.setActionClicked(false)
        } else {
            console.warn("Error occurred when adding board");
        }
    }

    const handleCloseModal = () => {
        props.setActionClicked(false)
    }

    useEffect(() => {
        props.getOrga()
        props.getBoards()
        loadTxt();
    }, [formValid]);

    return (
        <View style={styles.container}>
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={props.actionClicked}

            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{askLbl}</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Nouveau nom du workspace"
                            // value={updateWorkspaceName}
                            onChangeText={(text) => setActionName(text)}
                        />
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => handleCloseModal()}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#ef5a5a',
        marginLeft: 5,
    },

    confirmButton: {
        backgroundColor: '#42b883',
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default Update;