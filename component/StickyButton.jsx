import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';

const StickyButtonComponent = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [addName, setAddName] = useState('');
  const endUrl = `key=${process.env.EXPO_PUBLIC_API_KEY}&token=${process.env.EXPO_PUBLIC_API_TOKEN}`;
  const route = useRoute()
  const currentScreen = route.name;
  let txtAdd = null;
  switch (currentScreen) {
    case "Random":
      txtAdd = "Add an organization"
      break;
    case "Random2":
      txtAdd = "Add a list"
      break;
    default:
      break
  }
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleConfirm = () => {

    switch (currentScreen) {
      case "Random":
        props.addOrga(addName)
        txtAdd = "Add an organization"
        break;
      case "Random2":
        props.addList(addName,endUrl);
        txtAdd = "Add a list"
        break;
      default:
        break
    }

    closeModal();
  };


  return (
    <View style={styles.container}>
      {/* Your main content goes here */}

      {/* Sticky Button */}
      <TouchableOpacity style={styles.stickyButton} onPress={openModal}>
        <Ionicons name="add-circle" size={20} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{txtAdd}</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(text) => setAddName(text)}
              // Add onChangeText and value props to handle input changes
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
    flex: 1,
    padding: 17,
  },
  stickyButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
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

export default StickyButtonComponent;
