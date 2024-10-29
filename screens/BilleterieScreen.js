import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import NotificationBox from './NotificationBox'; // Si vous avez un composant personnalisé pour les notifications
import { Helmet } from 'react-helmet';
import API_URL from './config'; 

const BilleterieScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  // Afficher les notifications
  const showNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => setNotificationMessage(''), 3000); // Effacer le message après 3 secondes
  };

  // Gestion de l'envoi des données à l'API
  const handleSubmit = async (endpoint) => {
    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, {
        email,
        password,
      });
      showNotification(response.data.message, 'success');

      if (isLogin) {
        // Gérer la connexion réussie ici (redirection, mise à jour de l'état, etc.)
      } else {
        setIsLogin(true); // Passe à l'écran de connexion après l'inscription
      }
    } catch (error) {
      if (error.response) {
        showNotification(error.response.data.message, 'error');
      } else {
        showNotification('Une erreur est survenue', 'error');
      }
    }
  };

  // Gestion de la connexion
  const handleLogin = () => {
    handleSubmit('login');
  };

  // Gestion de l'inscription
  const handleRegister = () => {
    handleSubmit('register');
  };

  return (
    <View style={styles.container}>
      <Helmet>
        <title>{isLogin ? 'Connexion - Billeterie' : 'Inscription - Billeterie'}</title>
        <meta name="description" content="Écran de connexion et d'inscription pour la billeterie." />
      </Helmet>

      {notificationMessage && (
        <NotificationBox
          message={notificationMessage}
          type={notificationType}
          onClose={() => setNotificationMessage('')}
        />
      )}

      {/* Affichage du texte de notification */}
      {notificationMessage !== '' && (
        <Text style={styles.notificationText}>
          {notificationMessage}
        </Text>
      )}

      <Text style={styles.header}>{isLogin ? 'Connexion' : 'Inscription'}</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={isLogin ? "Se connecter" : "S'inscrire"} onPress={isLogin ? handleLogin : handleRegister} />
      <Button title={isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"} onPress={() => setIsLogin(!isLogin)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
    marginTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  notificationText: {
    color: 'red', // Vous pouvez changer la couleur selon le type de notification
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default BilleterieScreen;
