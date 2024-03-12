import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const Edit = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const handleOptionSelect = (value) => {

    if (value === 'Option 1') {
      setModalVisible(true);
    }
    if (value === 'Option 2') {
      // Handle Option 2
      props.deleteList(props.listId);
    }
    if(value == 'Option 3'){
      props.deleteCard()
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    // Handle confirmation, e.g., update the list name with the input value
    props.updateList(props.listId,textInputValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Menu style={styles.menu}>
        <MenuTrigger>
          <Entypo name="dots-three-horizontal" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => handleOptionSelect('Option 1')} text="Rename" />
          <MenuOption onSelect={() => handleOptionSelect('Option 2')} text="Delete" />
          <MenuOption onSelect={() => handleOptionSelect('Option 3')} text="Add card" />
        </MenuOptions>
      </Menu>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setTextInputValue(text)}
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
                onPress={closeModal}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    padding: 5,
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
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
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
  confirmButton: {
    backgroundColor: '#42b883',
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#ef5a5a',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Edit;
