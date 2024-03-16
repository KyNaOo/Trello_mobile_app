import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Button, Image } from 'react-native';
import Edit from './edit';
import { Entypo } from '@expo/vector-icons';

const List = props => {
  const [editableCard, setEditableCard] = useState(null);
  const [newName, setNewName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode,setEditMode] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null); // State to store the selected card
  const lastPressRef = useRef(0);

  const handleEditName = (card) => {
    setEditMode(true)
    if (editableCard === card) {
      // Confirm name change
      props.updateCard(card.id, newName);
      setEditableCard(null);
      setNewName('');
      setEditMode(false);
    } else {
      // Start editing name
      setEditableCard(card);
      setNewName(card.name);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditableCard(null);
    setNewName('');
  };

  const handleDoubleTap = (card) => {
    const currentTime = new Date().getTime();
    const delay = 500; // Adjust this value as needed for your double tap detection

    if (currentTime - lastPressRef.current < delay) {
      setSelectedCard(card); // Set the selected card when double tap occurs
      setIsModalVisible(true);
    }

    lastPressRef.current = currentTime;
  };

  const handleConfirmModal = () => {
    props.deleteCard(selectedCard.id)
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  handleButtonClick = (card) => {
    console.log("action performed on " + card.name)
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInset={{ bottom: 150 }}
      contentOffset={{ y: -20 }}
    >
      {props.listData.map((list) => (
        <View style={styles.card} key={list.id}>
          <View style={styles.headerContainer}>
            <Text style={styles.cardTitle}>{list.name}</Text>
            <Edit id={list.id} delete={props.deleteList} update={props.updateList} add={props.createCard} updateCard={props.updateCard} deleteCard={props.deleteCard}/>
          </View>
          <View style={styles.cardContent}>
            {list.cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                onPress={() => handleEditName(card)}
                onDoublePress={() => handleDoubleTap(card)}
              >
                <View style={styles.card}>
                  <View style={styles.cardItemContainer}>
                    {editableCard === card ? (
                      <View style={styles.editableTitleContainer}>
                        <TextInput
                          style={styles.editableTitle}
                          value={newName}
                          onChangeText={setNewName}
                        />
                        <TouchableOpacity onPress={handleCancelEdit}>
                          <Text style={styles.cancelButton}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity onPress={() => handleDoubleTap(card)}>
                        <Text style={styles.cardTitle}>{card.name}</Text>
                      </TouchableOpacity>
                    )}
                    {
                      editMode === true ? (<></>):(<TouchableOpacity onPress={() => handleButtonClick(card)}>
                      <Entypo name="link" size={30} color="black" />
                      </TouchableOpacity>)
                    }
                    
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Modal */}
      <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You really want to delete {selectedCard && selectedCard.name}?</Text>
            <View style={styles.modalButtons}>
              <Button title="Confirm" onPress={() => handleConfirmModal(selectedCard)} color="#42b883" />
              <Button title="Cancel" onPress={handleCancelModal} color="#ef5a5a" />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginVertical: 10,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editableTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editableTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
  },
  cancelButton: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  cardContent: {
    // Additional styling for the content inside the card
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default List;
