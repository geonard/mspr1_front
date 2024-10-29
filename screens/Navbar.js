import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import SocialMedia from './SocialMedia'; 
import NewsList from './News';
import SecurityInfo from './SecurityInfo'; 
import Programs from './Programs'; 
import Faq from './Faq'; 
import Partners from './Partners'; 
import Home from './Home'; 
import SiteMap from './SiteMap'; 
import BilleterieScreen from './BilleterieScreen'; 


const POINTS_TYPES = {
  RESTAURATION: 'restaurations',
  MAGASINS: 'magasins',
  WC: 'wc',
  OTHER: 'other', // Ajouter d'autres types si nécessaire
};

const Navbar = () => {
  const [showComponent, setShowComponent] = useState(''); // Gère quel composant afficher
  const [showMenu, setShowMenu] = useState(false); // Gère l'affichage du menu
  const [selectedPoint, setSelectedPoint] = useState(null); // Gère le point sélectionné sur la carte
  const [pointsOfInterest, setPointsOfInterest] = useState({});
  const [gpsCoordinates, setGpsCoordinates] = useState(''); // État pour les coordonnées GPS

  useEffect(() => {
    if (showComponent in POINTS_TYPES) {
      fetchPointsOfInterest(showComponent.toLowerCase());
    }
  }, [showComponent]);

  // Fonction pour récupérer les points d'intérêt en fonction du type
  const fetchPointsOfInterest = async (type) => {
    try {
      const response = await fetch(`{API_URL}/pointsOfInterest`);
      const data = await response.json();

      // Filtrer les points en fonction du type
      const filteredPoints = data.filter(point => point.type === type);
      setPointsOfInterest(prev => ({ ...prev, [type]: filteredPoints }));
    } catch (error) {
      console.error(`Erreur lors de la récupération des points ${type}:`, error);
    }
  };

  // Gestion du clic sur l'icône "hamburger" pour afficher ou cacher le menu
  const handleHamburgerClick = () => {
    setShowMenu(!showMenu); 
  };

  // Gestion du clic sur le logo pour afficher le composant "Home"
  const handleLogoClick = () => {
    setShowComponent('Home');
    setShowMenu(false); 
  };

  // Gestion de la sélection d'un élément du menu
  const handleMenuClick = (item) => {
    if (Object.values(POINTS_TYPES).includes(item)) {
      // Si l'élément est un type de points d'intérêt, ajustez les points d'intérêt et le composant à afficher
      setShowComponent(item);
      setShowMenu(false);
      fetchPointsOfInterest(item.toLowerCase()); // Récupère les points d'intérêt pour le type sélectionné
    } else {
      // Pour les autres composants, juste mettre à jour le composant à afficher
      setShowComponent(item);
      setShowMenu(false);
      setSelectedPoint(null); // Réinitialiser le point sélectionné
    }
  };

  const getEmojiForType = (type) => {
    switch(type) {
      case POINTS_TYPES.RESTAURATION: return '🍴';
      case POINTS_TYPES.MAGASINS: return '🛒';
      case POINTS_TYPES.WC: return '🚻';
      default: return '📍';
    }
  };

  const handlePointSelect = (point) => {
    setSelectedPoint(point);
    // Mettre à jour les coordonnées GPS affichées
    setGpsCoordinates(`Lat: ${point.latitude}, Lon: ${point.longitude}`);
  };

  return (
    <View style={styles.container}>
      {/* Zone de texte pour afficher les coordonnées GPS */}
      <View style={styles.gpsContainer}>
        <Text style={styles.gpsText}>{gpsCoordinates}</Text>
      </View>

      <View style={styles.navbar}>
        {/* Icône du menu hamburger */}
        <TouchableOpacity style={styles.hamburger} onPress={handleHamburgerClick}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>

        {/* Logo cliquable */}
        <TouchableOpacity onPress={handleLogoClick}>
          {/* Utilisation de require pour charger une image locale */}
          <Image source={require('../assets/logo.webp')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoClick}>
          {/* Utilisation de require pour charger une image locale */}
          <Image source={require('../assets/nation sound.png')} style={styles.logoContainer} />
        </TouchableOpacity>
      </View>

      {/* Affichage du menu déroulant si l'état showMenu est vrai */}
      {showMenu && (
        <ScrollView style={styles.menu} contentContainerStyle={styles.menuContainer}>
          <View style={styles.menuColumns}>
            <View style={styles.menuColumn}>
              <Text style={styles.menuHeader}>Menu général</Text>
              <TouchableOpacity onPress={() => handleMenuClick('Infos en cours')}>
                <Text style={styles.menuItem}>🔔 Infos en cours</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Informations de Sécurité')}>
                <Text style={styles.menuItem}>🔒 Informations de Sécurité</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Programmes')}>
                <Text style={styles.menuItem}>📅 Programmes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Informations Pratiques et FAQ')}>
                <Text style={styles.menuItem}>ℹ️ Informations Pratiques et FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Réseaux Sociaux')}>
                <Text style={styles.menuItem}>🌐 Réseaux Sociaux</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Partenaires')}>
                <Text style={styles.menuItem}>🤝 Partenaires</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Billeterie')}>
                <Text style={styles.menuItem}>🎫 Billeterie</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuColumn}>
              <Text style={styles.menuHeader}>Carte Interactive</Text>
              <TouchableOpacity onPress={() => handleMenuClick('Carte Interactive')}>
                <Text style={styles.menuItem}>🗺️ Carte plein écran</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Points d\'intérêts')}>
                <Text style={styles.menuItem}>📍 Points d'intérêts</Text>
              </TouchableOpacity>
              {Object.values(POINTS_TYPES).map(type => (
                <TouchableOpacity key={type} onPress={() => handleMenuClick(type)}>
                  <Text style={styles.menuItem}>{getEmojiForType(type)} {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {/* Affichage du composant sélectionné */}
      {showComponent === 'Home' && <Home />}
      {showComponent === 'Infos en cours' && <NewsList />}
      {showComponent === 'Informations de Sécurité' && <SecurityInfo />}
      {showComponent === 'Programmes' && <Programs />}
      {showComponent === 'Informations Pratiques et FAQ' && <Faq />}
      {showComponent === 'Social Médias' && <SocialMedia />}
      {showComponent === 'Carte Interactive' && (
          <SiteMap 
          selectedPoint={selectedPoint}
          pointsOfInterest={Object.values(pointsOfInterest).flat()} // Passe tous les points d'intérêt
        />
      )}
      {showComponent === 'Réseaux Sociaux' && <SocialMedia />}
      {showComponent === 'Partenaires' && <Partners />}
      {showComponent === 'Billeterie' && <BilleterieScreen />}
      {Object.values(POINTS_TYPES).includes(showComponent) && (
        <View style={styles.pointsContainer}>
          {pointsOfInterest[showComponent.toLowerCase()] && pointsOfInterest[showComponent.toLowerCase()].map(point => (
            <TouchableOpacity key={point.id} onPress={() => handlePointSelect(point)} style={styles.pointItem}>
              <Text style={styles.pointName}>{point.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 40,
    color: 'blue',
  },
  logoContainer: {
    flex: 1, // Permet de répartir l'espace également entre les enfants
    alignItems: 'center', // Centre le contenu horizontalement
    justifyContent: 'center', // Centre le contenu verticalement si nécessaire
  },
  logo: {
    width: 100,
    height: 40,
    marginLeft: 10,
  },
  menu: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  menuContainer: {
    padding: 10,
  },
  menuColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuColumn: {
    flex: 1,
    paddingRight: 10,
  },
  menuHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuItem: {
    padding: 5,
  },
  gpsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  gpsText: {
    fontSize: 14,
  },
  pointsContainer: {
    padding: 10,
  },
  pointItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pointName: {
    fontSize: 16,
  },
});

export default Navbar;
