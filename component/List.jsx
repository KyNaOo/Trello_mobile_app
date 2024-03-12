import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Edit from './edit';

const List = ({ listData, closeList }) => {
  const handleEditPress = (listId) => {
    // Handle edit press for the specific list with listId
    console.log(`Edit pressed for list with ID: ${listId}`);
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInset={{ bottom: 150 }}
      contentOffset={{ y: -20 }}
    >
      {listData.map((list) => (
        <View style={styles.card} key={list.id}>
          <View style={styles.headerContainer}>
            <Text style={styles.cardTitle}>{list.name}</Text>
            <Edit listId={list.id} deleteList={closeList} />
          </View>
          <View style={styles.cardContent}>
            {list.cards.map((card) => (
              <View style={styles.card} key={card.id}>
                <Text style={styles.cardTitle}>{card.name}</Text>
                {/* Additional properties you want to display for the card */}
              </View>
            ))}
          </View>
        </View>
      ))}
      {listData.length > 5 && (
        <View style={styles.lastcard}>
          <Text style={styles.cardTitle}></Text>
        </View>
      )}
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
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    // Additional styling for the content inside the card
  },
  lastcard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginVertical: 6,
    padding: 15,
  },
});

export default List;
