import { Modal, Pressable, StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import React from 'react';

export const RoutineAddModal = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}>
      <Pressable
      // replace styles with global styles if there's any replacealbe
        style={styles.container}
        onPressOut={() => props.setVisible(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}></View>
          </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
},
modalView: {
  // justifyContent: 'flex-end',
  //   alignItems: 'flex-end',
    // width: 270,
    height: 357,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#EEE',
    borderStyle: 'solid',
    borderWidth: 1.5,
}
});
