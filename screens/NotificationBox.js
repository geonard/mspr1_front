// frontend/screens/NotificationBox.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationBox = ({ message }) => {
  return (
    <View style={styles.notificationBox}>
      <Text style={styles.notificationText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationBox: {
    padding: 15,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#dff0d8', // couleur de fond
    borderColor: '#d6e9c6', // couleur de bordure
    borderWidth: 1, // largeur de bordure
    marginTop: -200,
  },
  notificationText: {
    color: '#3c763d', // couleur du texte
    fontSize: 16,
  },
});

export default NotificationBox;
