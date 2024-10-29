// DynamicStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './screens/DetailsScreen'; // Adjust the import according to your setup

const Stack = createNativeStackNavigator();

const DynamicStackNavigator = ({ route }) => {
  const { screensArr } = route.params; // Get screensArr from route params

  return (
    <Stack.Navigator>
      {screensArr.map(buttonInfo => (
        <Stack.Screen
          key={buttonInfo.id}
          name={buttonInfo.text}
          component={DetailsScreen}
          options={{
            headerStyle: {
              backgroundColor: buttonInfo.color,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default DynamicStackNavigator;
