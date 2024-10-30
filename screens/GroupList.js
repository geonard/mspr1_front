import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Picker, Linking } from 'react-native';
import axios from 'axios';
import API_URL from './config'; // Vérifiez que le chemin est correct

export default function Group() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');

  const fetchFaqData = async () => {
    try {
      const response = await axios.get(`${API_URL}/groups`); // Utilise l'adresse IP correcte
      setFaqData(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des groupes.');
      console.error('Erreur lors de la récupération des groupes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const filteredGroups = selectedGenre
    ? faqData.filter((group) => group.genre === selectedGenre)
    : faqData;

  return (
    <View style={styles.container}>
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
        </Picker>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((item) => (
            <View style={styles.groupRow} key={item.id}>
              <View style={styles.groupCol}>
                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
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
}

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
    backgroundColor: 'yellow',
  },
  scrollView: {
    height: 210,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
