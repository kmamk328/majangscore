
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

  //const [tableData, setTableData] = useState(initialRowData);

  // テキスト変更時のハンドラ
  const handleChangeText = (text: string, row: number, col: number) => {
    const updatedData = [...tableData];
    updatedData[row][col] = text;
    setTableData(updatedData);
  };

  // テーブルのヘッダーと列の幅
  //const tableHead = ['No.', 'name1', 'name2', 'name3', 'name4'];
  //const widthArr = [50, 80, 80, 80, 80];
  //const tableSum = ['計', 0, 0, 0, 0];
  //const tableChip = ['チップ', 0, 0, 0, 0];
  //const tableTotal = ['収支', 0, 0, 0, 0];
  //const tableIncludeGamePrice = ['場代込', 0, 0, 0, 0];

  const [playerCount, setPlayerCount] = useState(4);
  const [tableHead, setTableHead] = useState(['No.', ...Array.from({ length: playerCount }, (_, i) => `name${i + 1}`)]);
  const [tableData, setTableData] = useState([
    ['1', ...Array(playerCount).fill('')],
    ['2', ...Array(playerCount).fill('')],
    ['3', ...Array(playerCount).fill('')],
    ['4', ...Array(playerCount).fill('')],
  ]);
  const [scores, setScores] = useState(Array.from({ length: 6 }, () => Array(playerCount).fill(0)));
  const [chips, setChips] = useState(Array(playerCount).fill(0));
  const handleScoreChange = (rowIndex: number, playerIndex: number, value: string) => {
    const updatedScores = scores.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === playerIndex ? parseInt(value, 10) : cell)) : row
    );
    setScores(updatedScores);
  };

  const handleChipChange = (playerIndex: number, value: string) => {
    const updatedChips = chips.map((chip, index) => (index === playerIndex ? parseInt(value, 10) : chip));
    setChips(updatedChips);
  };


  const addRow = () => {
    const newRowNumber = tableData.length + 1;
    const newRow = [`${newRowNumber}`, ...Array(playerCount).fill('')];
    setTableData([...tableData, newRow]);
  };

  // const [ tableSum, setTableSum] = useState([
  //   ['計', ...Array(playerCount).fill('0')],
  // ]);
  // const [ tableChip, setTableChip] = useState([
  //   ['チップ', ...Array(playerCount).fill('0')],
  // ]);
  // const [ tableTotal, setTableTotal] = useState([
  //   ['収支', ...Array(playerCount).fill('0')],
  // ]);
  // const [ tableIncludeGamePrice, setIncludeGamePrice] = useState([
  //   ['場代込', ...Array(playerCount).fill('0')]
  // ]);

  const [tableFooter, setTableFooter] = useState([
    ['計', ...Array(playerCount).fill('0')],
    ['チップ', ...Array(playerCount).fill('0')],
    ['収支', ...Array(playerCount).fill('0')],
    ['場代込', ...Array(playerCount).fill('0')]
  ]);

  // プレイヤーごとのスコア合計を計算して tableFooter ステートを更新
React.useEffect(() => {
  const playerScores = Array(playerCount).fill(0);
  const playerChips = Array(playerCount).fill(0);

  tableData.forEach((rowData) => {
    for (let i = 1; i <= playerCount; i++) {
      playerScores[i - 1] += parseInt(rowData[i], 10) || 0;
      playerChips[i - 1] += parseInt(rowData[playerCount + i], 10) || 0;
    }
  });

  const updatedTableFooter = [...tableFooter];
  updatedTableFooter[0] = ['計', ...playerScores.map(String)];
  updatedTableFooter[1] = ['チップ', ...playerChips.map(String)];

  const calculatedNet = playerScores.map((score, i) => score + playerChips[i] * 2);
  updatedTableFooter[2] = ['収支', ...calculatedNet.map(String)];


  setTableFooter(updatedTableFooter);
}, [tableData, playerCount]);


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


      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableHead}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.head}
          textStyle={styles.text}/>
      </Table>

      <ScrollView style={styles.container}>

        <Table borderStyle={styles.tableBorder}>
          {tableData.map((rowData, rowIndex) => (
            <Row
              key={rowIndex}
              data={rowData.map((cell, cellIndex) => {
                if (cellIndex > 0 && cellIndex < playerCount + 1) {
                  const scoreValue = scores[rowIndex] && scores[rowIndex][cellIndex - 1] !== undefined
                    ? scores[rowIndex][cellIndex - 1].toString()
                    : '0';
                  return (
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      onChangeText={(value) => handleScoreChange(rowIndex, cellIndex - 1, value)}
                      value={scoreValue}
                    />
                  );
                }
                return cell;
              })}
              textStyle={styles.text}
            />
          ))}
        </Table>

        <TouchableOpacity style={styles.addRowBanner} onPress={addRow}>
          <Text style={styles.addRowText}>行を追加</Text>
        </TouchableOpacity>
      </ScrollView>

{/*
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableSum}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}/>
      </Table>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableChip}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}/>
      </Table>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableTotal}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}/>
      </Table>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableIncludeGamePrice}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}/>
      </Table>
*/}
{/*
      <Table borderStyle={styles.tableBorder}>
        <Rows
          data={tableFooter}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}/>
      </Table>
*/}

      <Table borderStyle={styles.tableBorder}>
        <Rows
          style={styles.footer}
          data={tableFooter.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
              if (rowIndex === 0 && cellIndex > 0 && cellIndex <= playerCount) {
                // 各プレイヤーのスコア合計を計算
                const totalScore = scores.reduce((sum, current) => sum + current[cellIndex - 1], 0);
                return totalScore.toString();
              } else if (rowIndex === 1 && cellIndex > 0 && cellIndex <= playerCount) {
                //チップ行
                // chips[cellIndex - 1] が存在することを確認してから文字列に変換
                const chipValue = chips[cellIndex - 1] !== undefined ? chips[cellIndex - 1].toString() : '0';
                return (
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(value) => handleChipChange(cellIndex - 1, value)}
                    value={chipValue}
                  />
                );
              } else if (rowIndex === 2 && cellIndex > 0 && cellIndex <= playerCount) {
                // 収支行
                const totalScore = scores.reduce((sum, current) => sum + current[cellIndex - 1], 0);
                const chipValue = chips[cellIndex - 1] !== undefined ? chips[cellIndex - 1] : 0;
                const netValue = totalScore + chipValue * 2;
                return netValue.toString();
              } else {
                //場代込は後で実装する
                return cell;
              }
            });
          })}
          textStyle={styles.text}
        />
      </Table>
      {/* 広告バナーエリア */}
      <View style={styles.banner}>
        <Text style={styles.advertisementText}>広告</Text>
      </View>



    </SafeAreaView>
  );
};


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      paddingTop: 0,
      backgroundColor: '#FFFFFF'
    },
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    head: {
      height: 40,
      backgroundColor: '#FFFFFF'
    },
    tableBorder: {
      borderWidth: 0.5
    },
    text: {
      margin: 1,
      textAlign: 'center'
    },
    row: {
      height: 60,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF'
    },
    footer: {
      height: 50,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF'
    },
    cell: {
      flex: 1,
      alignSelf: 'center'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      margin: 5,
      textAlign: 'center'
    },
    addRowBanner: {
      backgroundColor: '#f1f8ff', // 薄い青色
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    addRowText: {
      color: '#007bff', // 青色のテキスト
      fontSize: 16
    },
    advertisementText: {
      color: '#007bff', // 青色のテキスト
      fontSize: 16
    },
    banner: {
      height: 50, // 適切なサイズに調整
      backgroundColor: '#f1f8ff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default InputScreen;
