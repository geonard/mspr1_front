import axios from 'axios';

// URL de base pour les appels API
const API_URL = '{API_URL}/auth'; // Assurez-vous que l'URL correspond à celle de votre serveur backend

// Inscription
export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        throw error;
    }
};

// Connexion
export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error;
    }
};
