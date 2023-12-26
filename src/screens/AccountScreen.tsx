import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const AccountScreen = () => {
  // アカウント情報の取得と表示に関するロジックはここに実装

  return (
    <SafeAreaView>
      <Text>あかうんと</Text>
      {/* アカウント情報の表示 */}
      <TouchableOpacity onPress={() => {/* 新規登録画面への遷移ロジック */}}>
        <Text>新規登録</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountScreen;
