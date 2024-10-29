import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import API_URL from './config'; // Vérifiez que le chemin est correct

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données des actualités
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(`${API_URL}/news`); // Utiliser des backticks pour l'interpolation
        setNewsData(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des actualités.');
        console.error('Erreur lors de la récupération des actualités:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {newsData.length > 0 ? (
        newsData.map((news) => (
          <View style={styles.newsItem} key={news.id}>
            <Text style={styles.newsTitle}>
              {news.link ? (
                <TouchableOpacity onPress={() => Linking.openURL(news.link)}>
                  <Text style={styles.newsLink}>{news.title}</Text>
                </TouchableOpacity>
              ) : (
                news.title
              )}
            </Text>
            <Text style={styles.newsDescription}>{news.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>Aucune actualité disponible.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  newsItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  newsLink: {
    fontSize: 18,
    color: '#007BFF',
  },
  newsDescription: {
    fontSize: 14,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
