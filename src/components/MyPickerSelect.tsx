import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

class MyPickerSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <RNPickerSelect
        onValueChange={(value) => this.setState({ value })}
        items={[
          { label: '関西', value: '関西' },
          { label: '関東', value: '関東' },
          // 他の選択肢
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: '選択してください', value: null }}
      />
    );
  }
}

export default class RuleScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ルール選択</Text>
        <MyPickerSelect />
        {/* その他のコンポーネント */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
