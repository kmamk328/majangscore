
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, StatusBar, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputScoreScreen from './InputScoreScreen';

const Stack = createStackNavigator();

const SelectGameScreen = ( props ) => {
  const { navigation } = props;

  const navigationItems = [
    { label: '持ち点入力', screen: 'InputScoreScreen' },
    { label: 'スコア入力', screen: 'InputScoreScreen' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.screen)}
      style={styles.item}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={navigationItems}
        renderItem={renderItem}
        keyExtractor={item => item.label}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#FFFAFA',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
    textShadowColor:'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
});

export default SelectGameScreen;
