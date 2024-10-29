import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import API_URL from './config'; // Assurez-vous que le chemin est correct

export default function Programs() {
  const [programData, setProgramData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramsData = async () => {
      try {
        const response = await axios.get(`${API_URL}/programs`);
        setProgramData(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des programmes.");
        console.error("Erreur lors de la récupération des programmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramsData();
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
        <Text style={styles.header}>Programmes - Détails des Événements</Text>
        {programData.map((item) => (
          <View style={styles.programItem} key={item.id}>
            <Text style={styles.programTitle}>{item.scenes}</Text>
            <Text style={styles.programDetails}>{item.artistes}</Text>
            <Text style={styles.programDate}>Date : {item.startTime}</Text>
            <Text style={styles.programTime}>Heure : {item.endTime}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles
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
  programItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  programDetails: {
    fontSize: 16,
    marginTop: 5,
  },
  programDate: {
    fontSize: 14,
    marginTop: 5,
  },
  programTime: {
    fontSize: 14,
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
