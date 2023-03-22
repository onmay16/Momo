import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import PretendardedText from '../CustomComponent/PretendardedText';
import { Category } from '../CustomComponent/Category';
import { Routine } from './Routine';

export const CategoryRoutineList = (props) => {
  const renderRoutineList = routine => (
    <Routine
      name={routine.name}
      duration={routine.duration}
      difficulty={routine.difficulty}/>
  );

  return (
    <View style={{ marginBottom: '8%' }}>
      <Category name={props.category} />
      <View>
        {props.routines.map(routine => renderRoutineList(routine))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
