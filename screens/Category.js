import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Category = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.categoryBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  categoryBox: {
    backgroundColor: '#4CAF50', // Couleur de fond de la catégorie
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff', // Couleur du texte
    fontWeight: 'bold',
  },
});

export default Category;
