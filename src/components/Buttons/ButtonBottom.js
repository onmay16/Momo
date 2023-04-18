import { StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { PretendardedText } from '../CustomComponent/PretendardedText';

export const ButtonBottom = (props) => {
  return (
    <Pressable
      style={styles.nextButton}
      onPress={props.action}>
      <PretendardedText style={styles.nextButtonText}>{props.text}</PretendardedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    flex: 1,
    backgroundColor: '#3CE3AC',
    width: '100%',
    height: 87,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontWeight: 700,
    fontSize: 20,
  },
});
