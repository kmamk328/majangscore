import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ScoreScreen from '../screens/ScoreScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* 他のスクリーンの定義 */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
      {/* ...他のスクリーン... */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
