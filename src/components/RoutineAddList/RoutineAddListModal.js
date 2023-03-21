import { StyleSheet, Text, View, Pressable, Modal, SafeAreaView } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeRoutineAddListModal } from '../../redux/reducerSlices/modalSlice';

import PretendardedText from '../CustomComponent/PretendardedText';
import { CategoryRoutineList } from './CategoryRoutineList';

import BackIcon from '../../assets/icons/light/backIcon.svg';

export const RoutineAddListModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  function handleModal(action) {
    dispatch(action());
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalState.routineAddListModal}>
      <SafeAreaView>
        <Pressable style={{ flexDirection: 'row'}}>
          <Pressable onPress={() => handleModal(closeRoutineAddListModal)}>
            <BackIcon />
          </Pressable>
          <PretendardedText>루틴 추가하기</PretendardedText>
        </Pressable>
        <PretendardedText>루틴 목록</PretendardedText>
        <CategoryRoutineList />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({});
