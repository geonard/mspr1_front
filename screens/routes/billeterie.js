import axios from 'axios';

// URL de base pour les appels API
const API_URL = 'http://localhost:3002/billeterie'; // Assurez-vous que l'URL correspond à celle de votre serveur backend

// Récupérer tous les événements
export const getEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        throw error;
    }
};

// Ajouter un nouvel événement
export const addEvent = async (event) => {
    try {
        const response = await axios.post(API_URL, event);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'événement:', error);
        throw error;
    }
};

// Récupérer un événement spécifique
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'événement:', error);
        throw error;
    }
};

// Mettre à jour un événement
export const updateEvent = async (id, event) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, event);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'événement:', error);
        throw error;
    }
};

// Supprimer un événement
export const deleteEvent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement:', error);
        throw error;
    }
};
