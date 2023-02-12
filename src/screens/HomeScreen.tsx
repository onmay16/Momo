/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const App = () => {
  return(
    <View
      style={styles.contianer}
    >
      <Text>
        Home Screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contianer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
