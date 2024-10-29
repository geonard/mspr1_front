import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from './config'; // Assurez-vous que le chemin est correct

export default function Partners() {
  const [partnersData, setPartnersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données des partenaires
  const fetchPartnersData = async () => {
    try {
      const response = await axios.get(`${API_URL}/partners`); // Utilisation correcte des backticks
      setPartnersData(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des partenaires.');
      console.error('Erreur lors de la récupération des partenaires:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnersData();
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
        <Text style={styles.header}>Nos Partenaires</Text>
        {partnersData.map((partner, index) => (
          <View key={index} style={styles.partnerItem}>
            <TouchableOpacity onPress={() => Linking.openURL(partner.website)}>
              <Image source={{ uri: partner.logo }} style={styles.partnerLogo} />
            </TouchableOpacity>
            <Text style={styles.partnerName}>{partner.name}</Text>
            <Text style={styles.partnerCategory}>Catégorie: {partner.category}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  partnerItem: {
    marginBottom: 20,
  },
  partnerLogo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  partnerCategory: {
    fontSize: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
