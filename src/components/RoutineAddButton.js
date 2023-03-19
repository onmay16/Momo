import React, { useState } from 'react';
import {StyleSheet, Image, View, Pressable} from 'react-native';

import { RoutineAddModal } from './RoutineAddModal';

import AddButton from '../assets/images/add.png';

const RoutineAddButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container} >
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Image source={AddButton}/>
      </Pressable>
      <RoutineAddModal visible={isModalVisible} setVisible={setIsModalVisible}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default RoutineAddButton;
