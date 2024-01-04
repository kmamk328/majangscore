
import { Dimensions } from 'react-native';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Button, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';


const InputScreen = ({ route }) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    // 遷移元が 'SelectGameScreen' の場合、ヘッダーを非表示にする
    if (route.params?.fromSelectGame) {
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {/* 設定画面への遷移ロジック */}}
            title="設定"
          />
        ),
      });
    }
  }, [navigation, route.params]);

  // スコア入力に関するロジックはここに実装
  const numberOfPlayers = 4;
  const initialRowData = Array(numberOfPlayers).fill("").map((_, index) => [`${index + 1}`, "", "", "", ""]);

  const [tableData, setTableData] = useState(initialRowData);

  // テキスト変更時のハンドラ
  const handleChangeText = (text: string, row: number, col: number) => {
    const updatedData = [...tableData];
    updatedData[row][col] = text;
    setTableData(updatedData);
  };

  // テーブルのヘッダーと列の幅
  const tableHead = ['No.', 'プレイヤー1', 'プレイヤー2', 'プレイヤー3', 'プレイヤー4'];
  const widthArr = [50, 80, 80, 80, 80];
  const tableSum = ['計', 0, 0, 0, 0];
  const tableChip = ['チップ', 0, 0, 0, 0];
  const tableTotal = ['収支', 0, 0, 0, 0];
  const tableIncludeGamePrice = ['場代込', 0, 0, 0, 0];




  // 編集可能なセルをレンダリング
  const renderEditableCell = (data: string, index: number, col: number) => (
    <TextInput
      style={styles.input}
      onChangeText={(text) => handleChangeText(text, index, col)}
      value={data}
      keyboardType='numeric'
    />
  );

  // 行をレンダリング
  const renderRow = (rowData: string[], index: number) => (
    rowData.map((cellData, cellIndex) => (
      cellIndex === 0 ? (
        <View key={cellIndex} style={styles.cell}><Text>{cellData}</Text></View>
      ) : (
        <View key={cellIndex} style={styles.cell}>
          {renderEditableCell(cellData, index, cellIndex)}
        </View>
      )
    ))
  );

  const screenWidth = Dimensions.get('window').width;


  return (
    <SafeAreaView style={styles.safeArea}>


      <Table borderStyle={{borderWidth: 0.5}}>
        <Row data={tableHead} widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)} style={styles.head} textStyle={styles.text}/>
      </Table>

      <ScrollView style={styles.container}>
        <Table borderStyle={{borderWidth: 0.5}}>
          <Rows data={tableData.map((row, index) => renderRow(row, index))} widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)} style={styles.row}/>
        </Table>
      </ScrollView>

      <Table borderStyle={{borderWidth: 0.5}}>
        <Row data={tableSum} widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)} style={styles.footer} textStyle={styles.text}/>
      </Table>
      <Table borderStyle={{borderWidth: 0.5}}>
        <Row data={tableChip} widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)} style={styles.footer} textStyle={styles.text}/>
      </Table>
      <Table borderStyle={{borderWidth: 0.5}}>
        <Row data={tableTotal} widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)} style={styles.footer} textStyle={styles.text}/>
      </Table>
      <Table borderStyle={{borderWidth: 0.5}}>
        <Row data={tableIncludeGamePrice} widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)} style={styles.footer} textStyle={styles.text}/>
      </Table>



    </SafeAreaView>
  );
};


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      paddingTop: 0,
      backgroundColor: '#f1f8ff'
    },
    safeArea: {
      flex: 1,
      backgroundColor: '#f1f8ff'
    },
    head: {
      height: 40,
      backgroundColor: '#f1f8ff'
    },
    text: {
      margin: 1
    },
    row: {
      height: 70,
      flexDirection: 'row',
      backgroundColor: '#f1f8ff'
    },
    footer: {
      height: 50,
      flexDirection: 'row',
      backgroundColor: '#f1f8ff'
    },
    cell: {
      flex: 1,
      alignSelf: 'center'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      margin: 10,
      textAlign: 'center'
    }
  });

export default InputScreen;
