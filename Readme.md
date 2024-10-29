# Front-end du Projet Live Events Festival

## Description

Le front-end de l'application Live Events Festival est construit avec **React Native**. Il permet aux utilisateurs d'accéder aux informations sur les groupes de musique, les points d'intérêt, les alertes de sécurité, et bien plus encore.

## Fonctionnalités

- Affichage des groupes de musique avec leurs détails.
- Carte interactive avec les points d'intérêt, utilisant **Mapbox**.
- Notifications d'alerte de sécurité.
- Section FAQ pour les questions fréquentes.

## Installation

### Prérequis

- Node.js et npm installés sur votre machine.

### Étapes d'installation

1. **Accédez au répertoire du front-end** :
   ```bash
   cd msprs1/front
   npm install
   npx expo start --web
   npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1
   npm install react-router-dom axios mapbox-gl @mapbox/mapbox-sdk
   npx expo start --web
   npm start