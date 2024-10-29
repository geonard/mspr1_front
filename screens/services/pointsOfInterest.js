import axios from 'axios';
import API_URL from '../config'; // Assurez-vous que le chemin est correct

export const getPointsOfInterest = async () => {
  try {
    const response = await axios.get(`${API_URL}/pointsOfInterest`);
    const pointsOfInterest = response.data.points_of_interest;
    return pointsOfInterest;
  } catch (error) {
    console.error('Erreur lors de la récupération des points d\'intérêt:', error);
    alert(`Erreur lors de la récupération des points d'intérêt: ${error.response ? error.response.data : error.message}`);
    throw error;
  }
};
