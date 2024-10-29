import axios from 'axios';

export const getListOfGroup = async () => {
  try {
    const response = await axios.get('{API_URL}/listOfGroup');
    // Extraire la propriété 'points_of_interest' du retour
    const pointsOfInterest = response.data.points_of_interest;
    return pointsOfInterest;
  } catch (error) {
    console.error('Erreur lors de la récupération des points d\'intérêt:', error);
    alert(`Erreur lors de la récupération des points d'intérêt: ${error.response ? error.response.data : error.message}`);
    throw error;
  }
};