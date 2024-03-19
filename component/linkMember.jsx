import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Entypo } from '@expo/vector-icons';

const LinkMember = props => {
  const [memberStatus, setMemberStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch member status when component mounts or when props change
    const fetchMemberStatus = async () => {
      setIsLoading(true); // Set loading state to true before API call
      try {
        const status = await Promise.all(
          props.members.map(async member => {
            const isMember = await props.isMember(props.cardId, member.id);
            return { id: member.id, isMember };
          })
        );
        const statusObject = status.reduce((acc, { id, isMember }) => {
          acc[id] = isMember;
          return acc;
        }, {});
        setMemberStatus(statusObject);
      } catch (error) {
        console.error('Error fetching member status:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after API call
      }
    };

    fetchMemberStatus();
  }, [props.cardId, props.members]);

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Entypo name="link" size={30} color="black" />
        </MenuTrigger>
        <MenuOptions>
          {isLoading ? (
            <MenuOption text="Loading..." disabled />
          ) : (
            props.members.map((member, index) => (
              <MenuOption 
                key={index}
                onSelect={() => props.assignMember(props.cardId, member.id)} 
                text={member.fullName}
                style={[
                  styles.menuOption,
                  memberStatus[member.id] && styles.greenOption
                ]}
              />
            ))
          )}
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOption: {
    padding: 10,
  },
  greenOption: {
    backgroundColor: '#42b883',
  },
});

export default LinkMember;
