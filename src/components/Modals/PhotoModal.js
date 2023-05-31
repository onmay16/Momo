import { Modal, StyleSheet, View, Pressable, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { modalStyles } from '../../styles';

import { setPhotoModalStatus } from '../../redux/reducerSlices/modalSlice';

import { PretendardedText } from '../CustomComponent/PretendardedText';

import PhotoVer from '../../assets/images/modals/photoVer.svg';

export const PhotoModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  function closeModal() {
    dispatch(setPhotoModalStatus({
      status: false,
    }));
  }

  function takePhoto() {
    setTimeout(() => {
      alert('take photo');
      closeModal();
    }, 200);
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalState.photoModal}>
      <Pressable
        style={modalStyles.container}
        onPressOut={closeModal}>
        <TouchableWithoutFeedback>
          <View style={modalStyles.modalView}>
            <PretendardedText style={modalStyles.title}>사진 인증!</PretendardedText>
            <PhotoVer style={styles.image} />
            <View>
              <PretendardedText style={styles.description}>
                {'루틴을 완료한 순간을\n사진으로 찍어 인증하면'}
              </PretendardedText>
              <PretendardedText style={styles.boldText}>
                열정 포인트를 더 얻을 수 있어요!
              </PretendardedText>
            </View>
            <View style={modalStyles.buttons}>
              <Pressable
                style={[modalStyles.button, styles.leftButton]}
                onPress={closeModal}>
                <PretendardedText style={styles.leftButtonText}>괜찮아요</PretendardedText>
              </Pressable>
              <Pressable
                style={[modalStyles.button, styles.rightButton]}
                onPress={takePhoto}>
                <PretendardedText style={styles.rightButtonText}>좋아요!</PretendardedText>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>

      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    color: '#4C4C4C',
  },
  boldText: {
    fontSize: 14,
    color: '#4C4C4C',
    textAlign: 'center',
    fontWeight: '900',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    width: 134,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: 8,
  },
  leftButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FF6056',
  },
  rightButton: {
    borderBottomRightRadius: 8,
    backgroundColor: '#3CE3AC',
  },
  rightButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#222222',
  },
});
