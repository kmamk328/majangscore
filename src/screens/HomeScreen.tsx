
// Import necessary components from React Native and Expo
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define the App component
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>選択画面</Text>
      </View>
      
      {/* Main Content */}
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.navigate('ScoreScreen')}>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>AAAAAA</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>スコア入力</Text>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>履歴</Text>
        <Text style={styles.footerText}>input</Text>
        <Text style={styles.footerText}>setting</Text>
      </View>
    </SafeAreaView>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
  },

  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Export the App component
export default HomeScreen;
