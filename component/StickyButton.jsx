import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StickyButtonComponent = () => {
  return (
    <View style={styles.container}>
      {/* Your main content goes here */}
      <Text>This is your main content.</Text>

      {/* Sticky Button */}
      <TouchableOpacity style={styles.stickyButton}>
        <Text style={styles.buttonText}>Sticky Button</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  stickyButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StickyButtonComponent;
