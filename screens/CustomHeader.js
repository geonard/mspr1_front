import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking, Picker } from 'react-native';
import dataGroup from './data/Group.json'; // Assurez-vous que le chemin est correct

const GroupList = () => {
  const [selectedGenre, setSelectedGenre] = useState(''); // État pour le genre sélectionné

  // Filtrer les groupes en fonction du genre sélectionné
  const filteredGroups = selectedGenre
    ? dataGroup.filter((item) => item.genre === selectedGenre)
    : dataGroup;

  return (
    <View style={styles.container}>
      {/* Sélecteur de genre */}
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Sélectionner un genre:</Text>
        <Picker
          selectedValue={selectedGenre}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedGenre(itemValue)}
        >
          <Picker.Item label="Tous les genres" value="" />
          <Picker.Item label="J-pop" value="J-pop" />
          <Picker.Item label="Metal" value="Metal" />
          <Picker.Item label="Rock" value="Rock" />
          {/* Ajoutez d'autres genres si nécessaire */}
        </Picker>
      </View>

      {/* Liste des groupes */}
      <ScrollView style={styles.scrollView}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((item) => (
            <View style={styles.groupRow} key={item.id}>
              <View style={styles.groupCol}>
                <TouchableOpacity
                  onPress={() => {
                    // Lien spécifique pour Motorhead, sinon lien par défaut
                    const url = item.name === "Motorhead"
                      ? "https://www.specific-link-for-motorhead.com" // Remplacez par le lien spécifique
                      : item.link;
                    Linking.openURL(url);
                  }}
                >
                  <Image source={{ uri: item.image }} style={styles.groupImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.groupCol}>
                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.groupName}>{item.name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.groupCol}>
                <Text style={styles.detailsItem}>
                  {item.scene ? `Scène: ${item.scene}` : 'Scène inconnue'}
                </Text>
                <Text style={styles.detailsItem}>
                  {item.time ? `Heure: ${item.time}` : 'Heure inconnue'}
                </Text>
                <Text style={styles.detailsItem}>
                  {item.date ? `Date: ${item.date}` : 'Date inconnue'}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Aucun groupe disponible pour le genre sélectionné.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  selectorContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  scrollView: {
    height: 400, // Hauteur fixe pour le ScrollView
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  groupCol: {
    flex: 1,
    marginRight: 10,
  },
  groupImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  groupName: {
    fontSize: 18,
    color: '#007BFF',
  },
  detailsItem: {
    fontSize: 14,
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default GroupList;

