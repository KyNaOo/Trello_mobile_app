import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import edit from './edit';

const List = ({ listData }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}
    contentInset={{ bottom: 150 }} // Customize the bottom inset
    contentOffset={{ y: -20 }}   // Customize the initial scroll position
    >
      {listData.map((list) => (
        <View style={styles.card} key={list.id}>
          <Text style={styles.cardTitle}>{list.name}</Text>
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
