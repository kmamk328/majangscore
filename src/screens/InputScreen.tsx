
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InputScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {/* 設定画面への遷移ロジック */}}
          title="設定"
        />
      ),
    });
  }, [navigation]);

  // スコア入力に関するロジックはここに実装

  return (
    <SafeAreaView>
      <Text>{/* 日付の表示 */}</Text>
      {/* スコア入力テーブルの表示 */}
    </SafeAreaView>
  );
};

export default InputScreen;
