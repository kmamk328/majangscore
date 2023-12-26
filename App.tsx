import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryScreen from './src/screens/HistoryScreen';
import SelectGameScreen from './src/screens/SelectGameScreen';
import AccountScreen from './src/screens/AccountScreen';
import InputScreen from './src/screens/InputScreen';
import RuleScreen from './src/screens/RuleScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="りれき" component={HistoryScreen} />
        <Tab.Screen name="にゅうりょく" component={SelectGameScreen} />
        <Tab.Screen name="あかうんと" component={AccountScreen} />
        {/* 他の画面も同様に追加 */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
