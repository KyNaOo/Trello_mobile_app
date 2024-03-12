import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const Edit = (listId,deleteList) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    // Handle the selected option as needed
    console.log('Selected option:', value);
    if(value === "Option 2"){
        deleteList(listId);
    } 
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
