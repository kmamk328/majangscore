
import { Dimensions, Keyboard, Platform } from 'react-native';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Button, ScrollView, TextInput, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';
import { createStackNavigator } from '@react-navigation/stack';

import CustomKeyboard from '../components/CustomKeyboard';


import RuleScreen from './RuleScreen';

const Stack = createStackNavigator();


const InputScoreStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="InputScoreScreen" component={InputScoreScreen} />
    <Stack.Screen name="RuleScreen" component={RuleScreen} />
  </Stack.Navigator>
);

const InputScoreScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<{rowIndex: number | null, cellIndex: number | null}>({rowIndex: null, cellIndex: null});


  React.useLayoutEffect(() => {
    // 遷移元が 'SelectGameScreen' の場合、ヘッダーを非表示にする
    if (route.params?.fromSelectGame) {
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Button
          onPress={() => navigation.navigate('RuleScreen')}
            title="設定"
          />
        ),
      });
    }
  }, [navigation, route.params]);

  const numberOfPlayers = 4;
  const initialRowData = Array(numberOfPlayers).fill("").map((_, index) => [`${index + 1}`, "", "", "", ""]);

  //const [tableData, setTableData] = useState(initialRowData);

  const [playerCount, setPlayerCount] = useState(4);
  const [tableHead, setTableHead] = useState(['No.', ...Array.from({ length: playerCount }, (_, i) => `name${i + 1}`)]);
  const [tableData, setTableData] = useState([
    ['1', ...Array(playerCount).fill('')],
    ['2', ...Array(playerCount).fill('')],
    ['3', ...Array(playerCount).fill('')],
    ['4', ...Array(playerCount).fill('')],
  ]);
  const [scores, setScores] = useState(Array.from({ length: 6 }, () => Array(playerCount).fill('')));
  const [chips, setChips] = useState(Array(playerCount).fill(''));

  // テキスト変更時のハンドラ
  const handleChangeText = (text: string, row: number, col: number) => {
    const updatedData = [...tableData];
    updatedData[row][col] = text;
    setTableData(updatedData);
  };

  const [temporaryValue, setTemporaryValue] = useState('');

  const handleScoreChange = (rowIndex: number, playerIndex: number, value: string) => {
    const updatedScores = scores.map((row, i) =>
      // i === rowIndex ? row.map((cell, j) => (j === playerIndex ? parseInt(value, 10) : cell)) : row
      i === rowIndex ? row.map((cell, j) => (j === playerIndex ? parseInt(value, 10) : cell)) : row
      );
    setScores(updatedScores);
    // setScores(temporaryValue);
    setKeyboardVisible(false); // キー入力後にキーボードを非表示

  };




  const handleChipChange = (playerIndex: number, value: string) => {
    const updatedChips = chips.map((chip, index) =>
      index === playerIndex ? parseInt(value, 10) : chip
    );
    setChips(updatedChips);

    // tableFooter のチップセルに数値を反映する
    const updatedTableFooter = [...tableFooter];
    updatedTableFooter[1][playerIndex + 1] = value; // 1行目がチップ行
    setTableFooter(updatedTableFooter);
    setKeyboardVisible(false); // キー入力後にキーボードを非表示

  };

  const addRow = () => {
    const newRowNumber = tableData.length + 1;
    const newRow = [`${newRowNumber}`, ...Array(playerCount).fill('')];
    setTableData([...tableData, newRow]);
  };


  const [tableFooter, setTableFooter] = useState([
    ['計', ...Array(playerCount).fill(0)],
    ['チップ', ...Array(playerCount).fill('')],
    ['収支', ...Array(playerCount).fill(0)],
    ['場代込', ...Array(playerCount).fill(0)]
  ]);

  // プレイヤーごとのスコア合計を計算して tableFooter ステートを更新
React.useEffect(() => {
  const playerScores = Array(playerCount).fill('');
  const playerChips = Array(playerCount).fill('');

  tableData.forEach((rowData) => {
    for (let i = 1; i <= playerCount; i++) {
      playerScores[i - 1] += parseInt(rowData[i], 10) || 0;
      playerChips[i - 1] += parseInt(rowData[playerCount + i], 10) || 0;
    }
  });

  const updatedTableFooter = [...tableFooter];
  updatedTableFooter[0] = ['計', ...playerScores.map(Number)];
  updatedTableFooter[1] = ['チップ', ...playerChips.map(Number)];

  const calculatedNet = playerScores.map((score, i) => parseInt(score) + parseInt(playerChips[i]) * 2);
  updatedTableFooter[2] = ['収支', ...calculatedNet.map(Number)];


  setTableFooter(updatedTableFooter);
}, [tableData, playerCount]);



  // 編集可能なセルをレンダリング
  const renderEditableCell = (data: string, index: number, col: number) => (
    <TextInput
      style={styles.input}
      onChangeText={(text) => handleChangeText(text, index, col)}
      value={data}
      keyboardType='default'
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


  const handleHeaderChange = (text: string, index: number) => {
    const newTableHead = [...tableHead];
    newTableHead[index] = text;
    setTableHead(newTableHead);
  };

  const handleInputChange = (text, rowIndex, cellIndex) => {
    let newRow = [...tableData[rowIndex]];
    newRow[cellIndex] = text;

    // 入力された3つのセルの値を確認
    const filledCells = newRow.slice(1, 4).filter(cell => cell.trim() !== '');
    if (filledCells.length === 3) {
      // 合計が0になるように4番目のセルを計算
      const total = filledCells.reduce((sum, value) => sum + parseFloat(value), 0);
      newRow[4] = (-total).toString();
    }

    // 更新した行でtableDataを更新
    const newTableData = [...tableData];
    newTableData[rowIndex] = newRow;
    setTableData(newTableData);
  };


  const renderEditableTableHead = () => {
    return tableHead.map((header, index) => {
      if (header === 'No.') {
        // 'No.' の場合は編集不可能なテキストとして表示
        return <Text key={index} style={styles.headerText}>{header}</Text>;
      } else {
        // それ以外のヘッダーは編集可能な TextInput
        return (
          <TextInput
            key={index}
            value={header}
            onChangeText={(text) => handleHeaderChange(text, index)}
            style={styles.headerInput}
          />
        );
      }
    });
  };
  // スコア入力のための TextInput をレンダリング
  const renderScoreInputs = (rowData: string[], rowIndex: number) => {
    return rowData.map((cell, cellIndex) => {
      if (cellIndex > 0 && cellIndex < playerCount + 1) {
        // スコアが存在し、かつ数値であることをチェックする
        const score = scores[rowIndex] && scores[rowIndex][cellIndex - 1];
        const scoreValue = score !== undefined && !isNaN(score)
          ? score.toString()
          : '9999';
        const handleTextChange = (value: string) => {
          // 符号で始まる入力を許可するロジック
          if (value === '-' || value === '+') {
            handleScoreChange(rowIndex, cellIndex - 1, value);
          } else if (!isNaN(value) && value.trim() !== '') {
            // 数値のみを処理

            handleScoreChange(rowIndex, cellIndex - 1, value);
          }
          // それ以外の場合（無効な入力）では何もしない
        };

        return (
          <TextInput
            style={styles.input}
            keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
            onChangeText={handleTextChange}
            value={scoreValue}
            onFocus={() => setActiveInput({ rowIndex, cellIndex: cellIndex - 1 })}
          />
        );
      }
      return cell;
    });
  };
  const screenWidth = Dimensions.get('window').width;


  return (
    <SafeAreaView style={styles.safeArea}>


      <Table borderStyle={styles.tableBorder}>
        <Row data={renderEditableTableHead()} />
      </Table>

      <ScrollView style={styles.container}>
      {/* <TouchableOpacity> */}
        <Table borderStyle={styles.tableBorder}>
          {tableData.map((rowData, rowIndex) => (
            <Row
              key={rowIndex}
              data={renderScoreInputs(rowData, rowIndex)}
              textStyle={styles.text}
            />
          ))}
        </Table>
        {/* </TouchableOpacity> */}

        <TouchableOpacity style={styles.addRowBanner} onPress={addRow}>
          <Text style={styles.addRowText}>行を追加</Text>
        </TouchableOpacity>
      </ScrollView>
      <Table borderStyle={styles.tableBorder}>
        <Rows
          style={styles.footer}
          data={tableFooter.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
              if (rowIndex === 0 && cellIndex > 0 && cellIndex <= playerCount) {
                // 各プレイヤーのスコア合計を計算
                const totalScore = scores.reduce((sum, current) => sum + current[cellIndex - 1], 0);
                return isNaN(totalScore) ? 0 : totalScore;
              } else if (rowIndex === 1 && cellIndex > 0 && cellIndex <= playerCount) {
                //チップ行
                // chips[cellIndex - 1] が存在することを確認
                const chipValue = chips[cellIndex - 1] !== undefined ? chips[cellIndex - 1] : 0;
                return (
                  <TextInput
                    style={styles.input}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    onChangeText={(value) => handleChipChange(cellIndex - 1, value)}
                    value={chipValue !== undefined && !isNaN(chipValue) ? chipValue : 0}
                    />

                );
              } else if (rowIndex === 2 && cellIndex > 0 && cellIndex <= playerCount) {
                // 収支行
                const totalScore = scores.reduce((sum, current) => sum + current[cellIndex - 1], 0);
                const chipValue = chips[cellIndex - 1] !== undefined ? chips[cellIndex - 1] : 0;
                const netValue = Number(totalScore) + Number(chipValue) * 2;
                return isNaN(netValue) ? 0 : netValue;
              } else {
                //場代込は後で実装する
                return cell;
              }
            });
          })}
          textStyle={styles.text}
        />

      </Table>

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
    headerText: {
      margin: 1,
      textAlign: 'center'
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
    headerInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      margin: 5,
      textAlign: 'center'
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

export default InputScoreScreen;
