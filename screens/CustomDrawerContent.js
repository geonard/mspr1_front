// CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.title}>Menu Principal</Text>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
        <Text style={styles.subtitle}>Menu 1</Text>
        <DrawerItem
          label="Sous Menu 1"
          onPress={() => props.navigation.navigate('SubMenu1')}
        />
        <Text style={styles.subtitle}>Menu 2</Text>
        <DrawerItem
          label="Sous Menu 2"
          onPress={() => props.navigation.navigate('SubMenu2')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
  },
});
