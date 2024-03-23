import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import {useRoute} from "@react-navigation/native";
import Update from "./Update";

const Edit = props => {
  const [actionClicked, setActionClicked] = useState(false)
  const [action, setAction] = useState('')
  const route = useRoute()
  const currentScreen = route.name;
  let txtAdd = 'add';
  switch (currentScreen){
    case 'Random':
      txtAdd = 'Add a board'
      break;
    case 'List':
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
          {
            props.imAddingBoard &&
              <MenuOption onSelect={() => {
                setActionClicked(true)
                setAction('Kanban')
              }} text={'Add a Kanban'} />

          }
        </MenuOptions>
      </Menu>
      {
        actionClicked && <Update
              action={action}
              actionClicked={actionClicked}
              setActionClicked={setActionClicked}
              update={props.update}
              add={props.add}
              addKanban={props.addKanban}
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
