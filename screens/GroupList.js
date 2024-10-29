import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Picker, Linking } from 'react-native';
import axios from 'axios';
import API_URL from './config';

export default function Group() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelecwtedGenre] = useState('');

  const fetchFaqData = async () => {
    try {
      const response = await axios.get(`${API_URL}/groups`);
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
                  <Image source={{ uri: `${API_URL}/imagesGroup/${item.image}` }} style={styles.groupImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.groupCol}>
                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.groupName}>{item.name}</Text>
                  <Text style={styles.detailsItem}>{item.genre}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.groupCol}>
                <Text style={styles.detailsItem}>
                  {item.scene ? `Scène: ${item.scene}` : 'Scène inconnue'}
                </Text>
                <Text style={styles.detailsItem}>
                  {item.start ? `Heure de début: ${item.start}` : 'Heure de début inconnue'}
                </Text>
                <Text style={styles.detailsItem}>
                  {item.end ? `Heure de fin: ${item.end}` : 'Heure de fin inconnue'}
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
  // Vos styles ici...
});
