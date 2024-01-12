import React, { useState, Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import MyPickerSelect from '../components/MyPickerSelect';

const RuleScreen = () => {
  // ルール設定に関するロジックはここに実装

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ marginVertical: 20, marginLeft: 30 }}>持ち点</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedValue(value)}
          items={[
            { label: '関西', value: '関西' },
            { label: '関東', value: '関東' },
          ]}
          useNativeAndroidPickerStyle={false} // Androidのデフォルトスタイルを無効化
          style={pickerSelectStyles}
          placeholder={{ label: '選択してください', value: '' }}
          // Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
        />
      <Text>選択されたアイテム: {selectedValue}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderColor: '#789',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 300,
    marginLeft: 30
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
    //backgroundColor:'#eee'
  },
});


export default RuleScreen;
