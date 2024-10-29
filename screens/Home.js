import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import GroupList from './GroupList'; 
import SiteMap from './SiteMap'; 

const Home = () => {
  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
          <>
      <View style={styles.section}>
        <GroupList /> {/* Intègre le composant GroupList ici */}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>BILLETERIE</Text>
        {/* Intègre la section PLAN DU SITE ici */}
        <SiteMap />
      </View>
      </>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'yellow',
        color: 'red',               // Texte en rouge
    textDecorationLine: 'underline', // Soulignement du texte
  },
});

export default Home;
