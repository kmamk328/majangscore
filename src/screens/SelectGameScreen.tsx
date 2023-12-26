
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputScreen from './InputScreen';

const Stack = createStackNavigator();

const SelectGameStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SelectGame" component={SelectGameScreen} />
    <Stack.Screen name="InputScreen" component={InputScreen} />
  </Stack.Navigator>
);

const SelectGameScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('InputScreen')}>
        <Text>持ち点入力</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('InputScreen')}>
        <Text>スコア入力</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectGameStack;
