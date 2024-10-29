import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import axios from 'axios';
import API_URL from './config'; // Vérifiez que le chemin est correct

export default function SocialMedia() {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSocialMediaData = async () => {
    try {
      const response = await axios.get(`${API_URL}/socialMedia`); // Utilisation correcte des backticks
      console.log('Données reçues:', response.data);
      if (Array.isArray(response.data)) {
        setSocialMediaData(response.data);
      } else {
        console.error('Données reçues au format inattendu:', response.data);
        setError('Erreur : format des données inattendu.');
      }
    } catch (error) {
      setError('Erreur lors de la récupération des médias.');
      console.error('Erreur lors de la récupération des médias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialMediaData();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Réseaux Sociaux</Text>
        {socialMediaData.length > 0 ? (
          socialMediaData.map((item, index) => (
            <View key={index} style={styles.socialMediaItem}>
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <Image source={{ uri: item.logo }} style={styles.logo} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Aucune donnée disponible.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  socialMediaItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
});
