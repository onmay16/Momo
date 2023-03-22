import { StyleSheet, Text, View, Pressable, Modal, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
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

  // could this be in a slice
  const routineCollection = {
    'documents': [
      {
        'name': 'projects/momo-89849/databases/(default)/documents/routine_collection/r1',
        'fields': {
          'category': {
            'stringValue': '건강',
          },
          'duration': {
            'integerValue': '5',
          },
          'image_url': {
            'stringValue': 'leaf',
          },
          'routine_name': {
            'stringValue': '기지개',
          },
          'difficulty': {
            'integerValue': '1',
          },
        },
        'createTime': '2023-03-21T14:16:25.460169Z',
        'updateTime': '2023-03-21T14:16:25.460169Z',
      },
      {
        'name': 'projects/momo-89849/databases/(default)/documents/routine_collection/r2',
        'fields': {
          'routine_name': {
            'stringValue': '스트레칭',
          },
          'category': {
            'stringValue': '성장',
          },
          'duration': {
            'integerValue': '5',
          },
          'image_url': {
            'stringValue': 'band',
          },
          'difficulty': {
            'integerValue': '1',
          },
        },
        'createTime': '2023-03-21T14:18:39.549800Z',
        'updateTime': '2023-03-21T14:18:39.549800Z',
      },
      {
        'name': 'projects/momo-89849/databases/(default)/documents/routine_collection/r3',
        'fields': {
          'difficulty': {
            'integerValue': '2',
          },
          'image_url': {
            'stringValue': 'scale',
          },
          'duration': {
            'integerValue': '5',
          },
          'category': {
            'stringValue': '생활',
          },
          'routine_name': {
            'stringValue': '체중재기',
          },
        },
        'createTime': '2023-03-21T14:20:03.999249Z',
        'updateTime': '2023-03-21T14:20:03.999249Z',
      },
    ],
  };
  const [healthRoutines, sethealthRoutines] = useState([]);
  const [selfHelpRoutines, setSelfHelpRoutines] = useState([]);
  const [livingRoutines, setLivingRoutines] = useState([]);

  useEffect(() => {
    sethealthRoutines([]);
    setSelfHelpRoutines([]);
    setLivingRoutines([]);
    for (let i = 0; i < routineCollection.documents.length; i++) {
      const routine = routineCollection.documents[i];
      const category = routine.fields.category.stringValue;
      const name = routine.fields.routine_name.stringValue;
      const duration = routine.fields.duration.integerValue;
      const difficulty = routine.fields.difficulty.integerValue;
      if (category === '건강') {
        sethealthRoutines(routines => [...routines, {
          'name': name,
          'duration': duration,
          'difficulty': difficulty,
        }]);
      } else if (category === '성장') {
        setSelfHelpRoutines(routines => [...routines, {
          'name': name,
          'duration': duration,
          'difficulty': difficulty,
        }]);
      } else {
        setLivingRoutines(routines => [...routines, {
          'name': name,
          'duration': duration,
          'difficulty': difficulty,
        }]);
      }
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalState.routineAddListModal}>
      <SafeAreaView>
        <Pressable style={{ flexDirection: 'row' }}>
          <Pressable
            onPress={() => handleModal(closeRoutineAddListModal)}
            style={{ paddingRight: '4%', paddingLeft: '6%', paddingTop: 15, paddingBottom: 15 }}>
            <BackIcon />
          </Pressable>
          <View style={{ width: '76%', justifyContent: 'center', alignItems: 'center' }}>
            <PretendardedText style={{ fontWeight: 700, fontSize: 16, color: '#222222' }}>루틴 추가하기</PretendardedText>
          </View>
        </Pressable>
        <View style={{ marginLeft: '5%', marginTop: '2.5%' }}>
          <PretendardedText style={{ fontWeight: 700, fontSize: 12, marginBottom: '4%', color: '#4C4C4C' }}>루틴 목록</PretendardedText>
          <CategoryRoutineList category="건강" routines={healthRoutines}/>
          <CategoryRoutineList category="성장" routines={selfHelpRoutines}/>
          <CategoryRoutineList category="생활" routines={livingRoutines}/>
        </View>
        <Pressable>
          <PretendardedText>추가하기</PretendardedText>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({});
