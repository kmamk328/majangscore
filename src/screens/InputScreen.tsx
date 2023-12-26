import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const InputScreen = () => {
  // スコア入力に関するロジックはここに実装

  return (
    <SafeAreaView>
      <Text>{/* 日付の表示 */}</Text>
      <TouchableOpacity onPress={() => {/* 設定画面への遷移ロジック */}}>
        <Text>設定</Text>
      </TouchableOpacity>
      {/* スコア入力テーブルの表示 */}
    </SafeAreaView>
  );
};

export default InputScreen;
