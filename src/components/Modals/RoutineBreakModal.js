import { Modal, StyleSheet, Pressable, TouchableWithoutFeedback, Text, View } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setBreakModalStatus } from '../../redux/reducerSlices/modalSlice';
import { finishRoutine } from '../../redux/reducerSlices/userSlice';

import { PretendardedText } from '../CustomComponent/PretendardedText';

import BreakRoutine from '../../assets/images/modals/breakRoutine.svg';

import { modalStyles } from '../../styles';

export const RoutineBreakModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
  const routineState = useSelector(state => state.userRoutineSlice);

  function closeModal() {
    dispatch(setBreakModalStatus({
      status: false,
    }));
  }

  function finishRoutineFun() {
    setTimeout(() => {
      closeModal();
      dispatch(finishRoutine());
    }, 200);
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalState.breakModal}>
      <Pressable
        style={modalStyles.container}
        onPressOut={closeModal}>
        <TouchableWithoutFeedback>
          <View style={modalStyles.modalView}>
            <PretendardedText style={modalStyles.title}>오늘의 루틴을 중단할까요?</PretendardedText>
            <BreakRoutine style={styles.image} />
            <View>
              <PretendardedText style={styles.description}>
                오늘 완료해야 할
              </PretendardedText>
              <PretendardedText style={styles.boldText}>
                {routineState.numberOfReaminingRoutines}개의 루틴과 {routineState.pointSumOfReaminingRoutines}의 열정 포인트
                <PretendardedText style={styles.description}>
                {'를 \n포기하게 됩니다.'}
              </PretendardedText>
              </PretendardedText>
            </View>
            <View style={modalStyles.buttons}>
              <Pressable
                style={[modalStyles.button, styles.leftButton]}
                onPress={closeModal}>
                <PretendardedText style={styles.leftButtonText}>계속할게요</PretendardedText>
              </Pressable>
              <Pressable
                style={[modalStyles.button, styles.rightButton]}
                onPress={finishRoutineFun}>
                <PretendardedText style={styles.rightButtonText}>그만할래요</PretendardedText>
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
    textAlign: 'center',
    fontWeight: '900',
  },
  leftButton: {
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: 8,
  },
  leftButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#4C4C4C',
  },
  rightButton: {
    borderBottomRightRadius: 8,
    backgroundColor: '#FF6056',
  },
  rightButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
