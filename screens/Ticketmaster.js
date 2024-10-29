// src/components/Ticketmaster.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const Ticketmaster = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConcerts = async () => {
    try {
      // Remplacez l'URL par votre propre API
      const response = await axios.get('{API_URL}/tickets'); 
      setConcerts(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des concerts.');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (concert) => {
    Alert.alert(
      'Achat de Billet',
      `Vous êtes sur le point d'acheter un billet pour ${concert.name}.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Acheter', onPress: () => purchaseTicket(concert.id) }
      ]
    );
  };

  const purchaseTicket = async (concertId) => {
    try {
      const response = await axios.post(`{API_URL}/tickets`, { concertId });
      Alert.alert('Succès', response.data.message);
      fetchConcerts(); // Met à jour la liste des concerts après l'achat
    } catch (error) {
      Alert.alert('Erreur', 'Erreur lors de l\'achat du billet.');
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {concerts.map(concert => (
          <View key={concert.id} style={styles.concertCard}>
            <Text style={styles.concertName}>{concert.name}</Text>
            <Text>Scène: {concert.scene || 'Inconnue'}</Text>
            <Text>Heure: {concert.time || 'Inconnue'}</Text>
            <Text>Date: {concert.date || 'Inconnue'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handlePurchase(concert)}>
              <Text style={styles.buttonText}>Acheter Billet</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  concertCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  concertName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Ticketmaster;
