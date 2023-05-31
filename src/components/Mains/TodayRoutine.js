import { StyleSheet, ScrollView, View, Animated, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openDescriptionTypeModal } from '../../redux/reducerSlices/modalSlice';
import { finishRoutine } from '../../redux/reducerSlices/userSlice';

import Action from '../Action';
import { PretendardedText } from '../CustomComponent/PretendardedText';
import { DescriptionTypeModal } from '../Modals/DescriptionTypeModal';
import { PhotoModal } from '../Modals/PhotoModal';

export const TodayRoutine = () => {
  const dispatch = useDispatch();
  const userRoutineState = useSelector(state => state.userRoutineSlice);

  const [animatedPoint, setAnimatedPoint] = useState(0);

  const pointOpacity = useRef(new Animated.Value(0)).current;
  const pointY = useRef(new Animated.Value(100)).current;

  function openModal() {
    dispatch(openDescriptionTypeModal());
  }

  function pointAnimation() {
    Animated.timing(pointOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(pointY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(pointOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1000);
    setTimeout(() => {
      Animated.timing(pointY, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }

  function finishRoutineFun() {
    dispatch(finishRoutine());
}

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.actionsList}>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {userRoutineState.userRoutineActionList.map((action, index) => (action.isActiveToday ?
            <Action key={index} id={action.id} setAnimatedPoint={setAnimatedPoint} pointAnimation={pointAnimation} /> : null
          ))}
          <Pressable style={styles.quitButton} onPress={openModal}>
            <PretendardedText style={styles.quitBtnText}>오늘의 루틴 종료하기</PretendardedText>
          </Pressable>
        </ScrollView>
      </View>
      <DescriptionTypeModal type={'breakModal'} rightButtonAction={finishRoutineFun} />
      <PhotoModal/>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsList: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  quitButton: { width: '100%', height: 92, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#FFD7D5', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  quitBtnText: { fontWeight: '700', fontSize: 16, color: '#FF6056' },
});
