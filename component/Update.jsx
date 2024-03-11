import React, {useEffect, useState} from 'react';
import {View, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';


const Update = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [updateWorkspaceName, setUpdateWorkspaceName] = useState('');
    const [formValid, setFormValid] = useState(false)

    const handleConfirm = async () => {
        // console.warn(updateWorkspaceName)
        let url = `https://api.trello.com/1/organizations/${props.organization.id}?displayName=${updateWorkspaceName}&${props.endUrl}`
        let response = await fetch(url,{
            method: 'PUT'
        });
        if (response.ok){
            setFormValid(!formValid);
            props.getOrga()
            setModalVisible(false)
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
        }
    }

    useEffect(() => {
        props.getOrga()
    }, []);

    return (
        <View style={styles.container}>
            <Button
                title="Ouvrir le modal"
                onPress={() => setModalVisible(true)}
            />
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Changer le nom de l'organisation :</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Nouveau nom du workspace"
                            // value={updateWorkspaceName}
                            onChangeText={(text) => setUpdateWorkspaceName(text)}
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
                            onPress={() => setModalVisible(false)}
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