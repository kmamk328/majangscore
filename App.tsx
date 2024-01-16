import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import firebase from 'firebase';

import HistoryScreen from './src/screens/HistoryScreen';
import SelectGameScreen from './src/screens/SelectGameScreen';
import AccountScreen from './src/screens/AccountScreen';
import InputScoreScreen from './src/screens/InputScoreScreen';
import InputHaveScoreScreen from './src/screens/InputHaveScoreScreen';

import RuleScreen from './src/screens/RuleScreen';


import { firebaseConfig } from './env';

require('firebase/firestore');

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SelectGameStackNavigator = () => (
  <Stack.Navigator initialRouteName="SelectGameScreen">
    <Stack.Screen name="SelectGame" component={SelectGameScreen} />
    <Stack.Screen name="InputScoreScreen" component={InputScoreScreen} />
    <Stack.Screen name="InputHaveScoreScreen" component={InputHaveScoreScreen} />
    <Stack.Screen name="RuleScreen" component={RuleScreen} />
  </Stack.Navigator>
);
const App = () => {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="りれき" component={HistoryScreen} />
        <Tab.Screen name="にゅうりょく" component={SelectGameStackNavigator} />
        <Tab.Screen name="あかうんと" component={AccountScreen} />

        {/* 他の画面も同様に追加 */}
      </Tab.Navigator>



    </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
