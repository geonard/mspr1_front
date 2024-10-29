// frontend/screens/services/groupService.js
import axios from 'axios';

export const getListOfGroups = async () => {
  try {
    const response = await axios.get('{API_URL}/groups'); // Assure-toi que l'URL est correcte
    alert('Données reçues: ' + JSON.stringify(response.data)); // Affiche les données dans une alerte
        
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes:', error);
    throw new Error('Erreur lors de la récupération des groupes : ' + error.message);
  }
};
