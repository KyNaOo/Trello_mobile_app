import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import {useRoute} from "@react-navigation/native";
import Update from "./Update";

const Edit = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const [actionClicked, setActionClicked] = useState(false)
  const [action, setAction] = useState('')
  const route = useRoute()
  const currentScreen = route.name;
  let txtAdd = 'add';
  switch (currentScreen){
    case 'Random':
      txtAdd = 'Add a board'
      break;
    case 'Random2':
      txtAdd = 'Add a card'
      break;
    default:
      break;
  }

  return (
    <View style={styles.container}>
      <Menu style={styles.menu}>
        <MenuTrigger>
          <Entypo name="dots-three-horizontal" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => {
            setActionClicked(true)
            setAction('Rename')
          }} text="Rename" />
          <MenuOption onSelect={() => props.delete(props.id)} text="Delete" />
          <MenuOption onSelect={() => {
            setActionClicked(true)
            setAction('Add')
          }} text={txtAdd} />
        </MenuOptions>
      </Menu>

      {
        actionClicked && <Update
              action={action}
              endUrl={props.endUrl}

              actionClicked={actionClicked}
              setActionClicked={setActionClicked}
              modal={actionClicked}

              getOrga={props.getOrga}
              getBoards={props.getBoards}
              update={props.update}
              add={props.add}
              id={props.id}

          />
      }

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
});

export default Edit;
