import axios from 'axios';

// URL de base pour les appels API
const API_URL = '{API_URL}/artistes'; // Assurez-vous que l'URL correspond à celle de votre serveur backend

// Récupérer tous les artistes
export const getArtists = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des artistes:', error);
        throw error;
    }
};

// Ajouter un nouvel artiste
export const addArtist = async (artist) => {
    try {
        const response = await axios.post(API_URL, artist);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'artiste:', error);
        throw error;
    }
};

// Récupérer un artiste spécifique
export const getArtistById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'artiste:', error);
        throw error;
    }
};

// Mettre à jour un artiste
export const updateArtist = async (id, artist) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, artist);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'artiste:', error);
        throw error;
    }
};

// Supprimer un artiste
export const deleteArtist = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'artiste:', error);
        throw error;
    }
};
