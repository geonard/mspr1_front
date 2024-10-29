// screens/ConcertsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Concerts from './Concerts';
import Tickets from './Tickets';

const Stack = createStackNavigator();

export default function ConcertsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Concerts" component={Concerts} />
      <Stack.Screen name="Tickets" component={Tickets} />
    </Stack.Navigator>
  );
}
