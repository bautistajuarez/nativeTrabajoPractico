import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HomeMenu from './src/components/HomeMenu';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='HomeMenu' component={HomeMenu} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
