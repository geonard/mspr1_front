import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tickets() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Billetterie</Text>
      {/* Ajouter le contenu de la billetterie ici */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
