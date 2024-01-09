import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const RuleScreen = () => {
  // ルール設定に関するロジックはここに実装

  const [selectedValue, setSelectedValue] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'リンゴ', value: 'apple' },
          { label: 'バナナ', value: 'banana' },
          { label: 'オレンジ', value: 'orange' },
        ]}
      />
      <Text>選択されたアイテム: {selectedValue}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});


export default RuleScreen;
