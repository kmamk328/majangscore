import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Alert, TouchableOpacity,TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const App = () => {
  const [playerCount, setPlayerCount] = useState(4);
  const [tableHead, setTableHead] = useState(['No.', ...Array.from({ length: playerCount }, (_, i) => `プレイヤー${i + 1}`), '人数追加']);
  const [tableData, setTableData] = useState([
    ['1', ...Array(playerCount).fill(''), '✔️'],
    ['2', ...Array(playerCount).fill(''), '✔️'],
    ['3', ...Array(playerCount).fill(''), '✔️'],
    ['4', ...Array(playerCount).fill(''), '✔️'],
    ['5', ...Array(playerCount).fill(''), '✔️'],
    ['6', ...Array(playerCount).fill(''), '✔️'],
  ]);
  const [scores, setScores] = useState(Array.from({ length: 6 }, () => Array(playerCount).fill(0)));
  const [chips, setChips] = useState(Array(playerCount).fill(0));
  const handleScoreChange = (rowIndex, playerIndex, value) => {
    const updatedScores = scores.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === playerIndex ? parseInt(value, 10) : cell)) : row
    );
    setScores(updatedScores);
  };

  const handleChipChange = (playerIndex, value) => {
    const updatedChips = chips.map((chip, index) => (index === playerIndex ? parseInt(value, 10) : chip));
    setChips(updatedChips);
  };


  const addRow = () => {
    const newRowNumber = tableData.length + 1;
    const newRow = [`${newRowNumber}`, ...Array(playerCount).fill(''), '✔️'];
    setTableData([...tableData, newRow]);
  };

  const [tableFooter, setTableFooter] = useState([
    ['計', ...Array(playerCount).fill('0'), 'a'],
    ['チップ', ...Array(playerCount).fill('0'), 'a'],
    ['収支', ...Array(playerCount).fill('0'), 'ab']
  ]);
  

  // const updateScoresForPlayerCount = (newPlayerCount: number) => {
  //   // 新しいtableHeadを作成します。
  //   const newTableHead = ['No.', ...Array.from({ length: newPlayerCount }, (_, i) => `プレイヤー${i + 1}`), '人数追加'];
  
  //   // 新しいスコア配列を作成します。
  //   const newScores = scores.map(row => {
  //     const newRow = row.slice(0, newPlayerCount);
  //     return newRow.concat(Array(Math.max(newPlayerCount - newRow.length, 0)).fill(0));
  //   });
  
  //   // 新しいテーブルデータを作成します。
  //   const newTableData = tableData.map(row => {
  //     const newRow = row.slice(0, newPlayerCount);
  //     return newRow.concat(Array(Math.max(newPlayerCount - newRow.length, 0)).fill(''), '✔️');
  //   });
  
  //   // ステートを更新します。
  //   setPlayerCount(newPlayerCount);
  //   setScores(newScores);
  //   setTableData(newTableData);
  //   setTableHead(newTableHead); // この行を追加
  //   setChips(chips.length > newPlayerCount ? chips.slice(0, newPlayerCount) : chips.concat(Array(newPlayerCount - chips.length).fill(0)));
  // };
  const updateScoresForPlayerCount = (newPlayerCount: number) => {
    // 新しいプレイヤーヘッドを作成
    const newTableHead = ['No.', ...Array.from({ length: newPlayerCount }, (_, i) => `プレイヤー${i + 1}`), '人数追加'];
  
    // 新しいテーブルデータを作成
    const newTableData = tableData.map((row) => {
      const newRow = [...row.slice(0, newPlayerCount), ...Array(newPlayerCount - row.length + 1).fill('')];
      newRow[newPlayerCount + 1] = row[row.length - 1]; // 最後のチェックマークを再配置
      return newRow;
    });
    // 新しいチップ配列を作成
    const newChips = [...chips];
    while (newChips.length < newPlayerCount + 1) {
      newChips.push(0); // 不足分を0で埋める
    }
  
    // 新しいフッターデータを作成
    const newTableFooter = tableFooter.map((row) => {
      const newRow = [...row.slice(0, newPlayerCount), ...Array(newPlayerCount - row.length + 1).fill('')];
      newRow[newPlayerCount + 1] = row[row.length - 1]; // 最後のチェックマークを再配置
      return newRow;
    });
  
  
    // ステートを更新
    setTableHead(newTableHead);
    setTableData(newTableData);
    setTableFooter(newTableFooter);
    setPlayerCount(newPlayerCount); // 最後にプレイヤー数のステートを更新
  };
  
  


  const showPlayerCountSelection = () => {
    Alert.alert(
      "プレイヤー数の選択",
      "プレイヤー数を選んでください",
      [
        { text: "4人", onPress: () => updateScoresForPlayerCount(4) },
        { text: "5人", onPress: () => updateScoresForPlayerCount(5) },
        { text: "6人", onPress: () => updateScoresForPlayerCount(6) },
        { text: "キャンセル", onPress: () => {}, style: "cancel" }
      ]
    );
  };
  const renderTableHead = () => {
    const headCells = tableHead.map((cell, index) => {
      if (cell === '人数追加') {
        return (
          <TouchableOpacity key={index} onPress={showPlayerCountSelection} style={styles.headerCell}>
            <Text style={styles.text}>{cell}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <View key={index} style={styles.headerCell}>
            <Text style={styles.text}>{cell}</Text>
          </View>
        );
      }
    });

    return (
      <Row data={headCells} style={styles.head} textStyle={styles.text}/>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>{new Date().toLocaleDateString()}</Text>
      </View>

      <Table borderStyle={styles.tableBorder}>
        {renderTableHead()}
      </Table>

      <ScrollView style={styles.tableContainer}>
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



      <Table borderStyle={styles.tableBorder}>
        <Rows
          data={tableFooter.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
              if (rowIndex === 0 && cellIndex > 0 && cellIndex <= playerCount) {
                // 各プレイヤーのスコア合計を計算
                const totalScore = scores.reduce((sum, current) => sum + current[cellIndex - 1], 0);
                return totalScore.toString();
              } else if (rowIndex === 1 && cellIndex > 0 && cellIndex <= playerCount) {
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
              } else {
                return cell;
              }
            });
          })}
          textStyle={styles.text}
        />
      </Table>
      {/* 広告バナーエリア */}
      <View style={styles.banner}>
        {/* 広告コンテンツ */}
      </View>

      <View style={styles.footer}>
        <Button title="ルール設定" onPress={showPlayerCountSelection} />
        {/* 他のボタンもここに配置 */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableContainer: {
    flex: 1
  },
  tableBorder: {
    borderWidth: 0.5,
    borderColor: '#ddd'
  },
  rowBorder: {
    borderBottomWidth: 0.5,
    borderColor: '#000', // ここでは線を黒色に設定
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6,
    textAlign: 'center', // テキストを中央揃えに
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    padding: 10,
    textAlign: 'center',
    color: 'black',
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // 必要に応じて他のスタイルを追加
  },

  footer: {
    height: 50,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  row: {
    alignItems: 'center', // 行全体のアライメント
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
  banner: {
    height: 50, // 適切なサイズに調整
    backgroundColor: '#ddd', // 一時的な色
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScoreScreen;
