// GroupList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataDisplay from './DataDisplay'; // Assurez-vous que le chemin est correct

const GroupList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('{API_URL}/groups'); // Assurez-vous que l'URL est correcte
        setData(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des groupes.');
        console.error('Erreur lors de la récupération des groupes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return <DataDisplay data={data} />;
};

export default GroupList;
