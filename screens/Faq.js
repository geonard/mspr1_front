import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import API_URL from './config'; // Vérifiez que le chemin est correct

export default function Faq() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Remplacer l'ancien code d'appel API par useEffect
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await axios.get(`${API_URL}/faq`);
        setFaqData(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération de la FAQ.');
        console.error('Erreur lors de la récupération de la FAQ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqData();
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
        <Text style={styles.header}>FAQ - Questions Fréquemment Posées</Text>
        {faqData.map((item) => (
          <View style={styles.faqItem} key={item.id}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Ajoutez vos styles ici
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  faqItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    marginTop: 5,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
