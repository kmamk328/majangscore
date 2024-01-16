
import { Dimensions } from 'react-native';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Button, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';


const InputScoreScreen = ({ route }) => {
  const navigation = useNavigation();

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

  // スコア入力に関するロジックはここに実装
  const numberOfPlayers = 4;
  const initialRowData = Array(numberOfPlayers).fill("").map((_, index) => [`${index + 1}`, "", "", "", ""]);
  const [tableData, setTableData] = useState(initialRowData);


  const [playerCount, setPlayerCount] = useState(4);
  // テーブルのヘッダーと列の幅
  // const tableHead = ['No.', 'name1', 'name2', 'name3', 'name4'];
  const [tableHead, setTableHead] = useState(['No.', ...Array.from({ length: playerCount }, (_, i) => `name${i + 1}`)]);

  const widthArr = [50, 80, 80, 80, 80];
  const tableSum = ['計', 0, 0, 0, 0];
  const tableChip = ['チップ', 0, 0, 0, 0];
  const tableTotal = ['収支', 0, 0, 0, 0];
  const tableIncludeGamePrice = ['場代込', 0, 0, 0, 0];

  const [chips, setChips] = useState(Array(playerCount).fill(0));


  // // テキスト変更時のハンドラ
  // const handleChangeText = (text: string, row: number, col: number) => {
  //   const updatedData = [...tableData];
  //   updatedData[row][col] = text;
  //   setTableData(updatedData);
  // };
  const handleChangeText = (text, rowIndex, colIndex) => {
    const updatedData = tableData.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === colIndex ? text : cell))
        : row
    );
    setTableData(updatedData);
  };

  const renderEditableChip = () => {
    return tableChip.map((chips, index) => {
      if (chips === 'チップ') {
        // 'No.' の場合は編集不可能なテキストとして表示
        return <Text key={index} style={styles.headerText}>{chips}</Text>;
      } else {
        // それ以外のヘッダーは編集可能な TextInput
        return (
          <TextInput
            key={index}
            value={String(chips)}
            onChangeText={(text) => handleChipChange(text, index)}
            style={styles.input}
          />
        );
      }
    });
  };
  const handleChipChange = (text: string, index: number) => {
    const newTableChip = [...tableChip];
    newTableChip[index] = text.toString();
    setChips(newTableChip);
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
  const handleHeaderChange = (text: string, index: number) => {
    const newTableHead = [...tableHead];
    newTableHead[index] = text;
    setTableHead(newTableHead);
  };


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
  // const renderRow = (rowData: string[], index: number) => (
  //   rowData.map((cellData, cellIndex) => (
  //     cellIndex === 0 ? (
  //       <View key={cellIndex} style={styles.cell}><Text>{cellData}</Text></View>
  //     ) : (
  //       <View key={cellIndex} style={styles.cell}>
  //         {renderEditableCell(cellData, index, cellIndex)}
  //       </View>
  //     )
  //   ))
  // );
  const renderRow = (rowData: string[], rowIndex: number) => {
    return rowData.map((cellData: string, columnIndex: number) => (
      <TextInput
        style={styles.cell}
        value={cellData}
        onChangeText={(text) => renderEditableCell(text, rowIndex, columnIndex)}
      />
    ));
  };
  
  const addRow = () => {
    const newRowNumber = tableData.length + 1;
    const newRow = [`${newRowNumber}`, ...Array(playerCount).fill('')];
    setTableData([...tableData, newRow]);
  };


  const screenWidth = Dimensions.get('window').width;


  return (
    <SafeAreaView style={styles.safeArea}>


      <Table borderStyle={{borderWidth: 0.5}}>
        <Row
          data={renderEditableTableHead()}
        />
      </Table>

      <ScrollView style={styles.container}>
        <Table borderStyle={{borderWidth: 0.5}}>
          <Rows
            data={tableData.map((row, index) => renderRow(row, index))}
            widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
            style={styles.row}
          />
        </Table>
        <TouchableOpacity style={styles.addRowBanner} onPress={addRow}>
          <Text style={styles.addRowText}>行を追加</Text>
        </TouchableOpacity>
      </ScrollView>

      <Table borderStyle={{borderWidth: 0.5}}>
        <Row
          data={tableSum}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}
        />
      </Table>
      <Table borderStyle={{borderWidth: 0.5}}>
        <Row
          data={renderEditableChip()}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}
        />
      </Table>
      <Table borderStyle={{borderWidth: 0.5}}>
        <Row
          data={tableTotal}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
          textStyle={styles.text}
        />
      </Table>
      <Table borderStyle={{borderWidth: 0.5}}>
        <Row
          data={tableIncludeGamePrice}
          widthArr={Array(tableHead.length).fill(screenWidth / tableHead.length)}
          style={styles.footer}
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
    flex: 0,
    alignSelf: 'center',
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
