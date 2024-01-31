import React, { useState, Component, useEffect } from 'react';
import { Select, FormControl, CheckIcon, WarningOutlineIcon, Center } from "native-base";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase/app';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, doc, setDoc } from "firebase/firestore";

import DeviceInfo from 'react-native-device-info';

import MyPickerSelect from '../components/MyPickerSelect';

import { firebaseConfig } from '../../env';

// require('firebase/firestore');

// Firebaseの初期化（既に行っている場合は不要）
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}


const RuleScreen = () => {
  const [selectedPoints, setSelectedPoints] = useState('');
  const [selectedReturnPoints, setSelectedReturnPoints] = useState('');
  const [selectedUma, setSelectedUma] = useState('');
  const [selectedRate, setSelectedRate] = useState('');
  const [selectedDobon, setSelectedDobon] = useState('');
  const [selectedChip, setSelectedChip] = useState('');

  const [deviceId, setDeviceId] = useState('');

  const [number, onChangeNumber] = React.useState('');


  // useEffect(() => {
  //   const fetchDeviceId = async () => {
  //     const id = await DeviceInfo.getUniqueId();
  //     setDeviceId(id);
  //   };
  //   fetchDeviceId();
  // }, []);

  const saveToFirebase = async () => {
    try {
      const db = getFirestore();
      const scoresRef = collection(db, 'scores');
      // const selectedPointsRef = doc(scoresRef, 'E6fisDXTmbaLxd4TkVN5', 'selectedPoints', deviceId);
      const selectedPointsRef = doc(scoresRef, 'E6fisDXTmbaLxd4TkVN5');
      await setDoc(selectedPointsRef, {
        selectedPoints,
        selectedReturnPoints,
        selectedUma,
        selectedRate,
        selectedDobon,
        selectedChip
      });

      // console.log('Value saved to Firebase:', selectedValue);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
    <Center>
      <FormControl w="3/4" maxW="300">
      <FormControl.Label>持ち点</FormControl.Label>
        <Select
          selectedValue={selectedPoints}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedPoints(itemValue)}
        >
          <Select.Item label="25000点" value="25000Points" />
          <Select.Item label="30000点" value="30000Points" />
          <Select.Item label="35000点" value="35000Points" />
          <Select.Item label="40000点" value="40000Points" />

        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>
      {/* Rest of your component */}

      <FormControl w="3/4" maxW="300">
      <FormControl.Label>返し点</FormControl.Label>
        <Select
          selectedValue={selectedReturnPoints}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedReturnPoints(itemValue)}
        >
          <Select.Item label="25000点" value="25000ReturnPoints" />
          <Select.Item label="30000点" value="30000ReturnPoints" />
          <Select.Item label="35000点" value="35000ReturnPoints" />
          <Select.Item label="40000点" value="40000ReturnPoints" />
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl w="3/4" maxW="300">
      <FormControl.Label>ウマ</FormControl.Label>
        <Select
          selectedValue={selectedUma}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedUma(itemValue)}
        >
          <Select.Item label="なし" value="nothingUma" />
          <Select.Item label="05-10" value="05-10" />
          <Select.Item label="10-20" value="10-20" />
          <Select.Item label="10-30" value="10-30" />
          <Select.Item label="20-40" value="20-40" />
          <Select.Item label="30-60" value="30-60" />
          <Select.Item label="40-80" value="40-80" />
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl w="3/4" maxW="300">
      <FormControl.Label>レート</FormControl.Label>
        <Select
          selectedValue={selectedRate}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedRate(itemValue)}
        >
          <Select.Item label="点1" value="1PerPoint" />
          <Select.Item label="点2" value="2PerPoints" />
          <Select.Item label="点3" value="3PerPoints" />
          <Select.Item label="点5" value="5PerPoints" />
          <Select.Item label="点10" value="10PerPoints" />
          <Select.Item label="点20" value="20erPoints" />
          <Select.Item label="点30" value="30erPoints" />
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>


      <FormControl w="3/4" maxW="300">
      <FormControl.Label>トビ賞</FormControl.Label>
        <Select
          selectedValue={selectedDobon}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedDobon(itemValue)}
        >
          <Select.Item label="なし" value="nothingDobon" />
          <Select.Item label="10000点" value="10000Dobon" />
          <Select.Item label="20000点" value="20000Dobon" />
          <Select.Item label="30000点" value="30000Dobon" />
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl w="3/4" maxW="300">
      <FormControl.Label>チップ</FormControl.Label>
        <Select
          selectedValue={selectedChip}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedChip(itemValue)}
        >
          <Select.Item label="なし"  value="nothingChip" />
          <Select.Item label="50P"   value="50ChipPoints" />
          <Select.Item label="100P"  value="100ChipPoints" />
          <Select.Item label="200P"  value="200ChipPoints" />
          <Select.Item label="500P"  value="500hipPoints" />
          <Select.Item label="1000P" value="1000ChipPoints" />
          <Select.Item label="2000P" value="2000ChipPoints" />
          <Select.Item label="3000P" value="3000ChipPoints" />
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl w="3/4" maxW="300">
      <FormControl.Label>ゲーム代</FormControl.Label>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Game Fee"
        keyboardType="numeric"
      />
      </FormControl>

      {/* <TouchableOpacity style={styles.saveRuleBanner} onPress={saveRule}> */}
      <TouchableOpacity style={styles.saveRuleBanner} onPress={saveToFirebase}>
        <Text style={styles.saveRuleText}>ルール設定を保存</Text>
      </TouchableOpacity>

    </Center>
    </ScrollView>
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
  saveRuleBanner: {
    backgroundColor: '#f1f8ff', // 薄い青色
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveRuleText: {
    color: '#007bff', // 青色のテキスト
    fontSize: 16
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
