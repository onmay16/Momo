import { StyleSheet, View } from "react-native";
import React from "react";

import PretendardedText from "../CustomComponent/PretendardedText";

import Difficulty from '../../assets/images/difficultyStar.svg';

export const Routine = (props) => {
  return (
    <View style={{ flexDirection: 'row', marginLeft: '2%', height: 25, alignItems: 'center' }}>
      <PretendardedText style={{ fontWeight: 500, fontSize: 14, color: '#222222' }}>{props.name} (+{props.duration}분) </PretendardedText>
      <View style={{ justifyContent: 'center' }}>
        <Difficulty />
      </View>
      <PretendardedText style={{ fontWeight: 500, fontSize: 14, color: '#FFEA2D' }}> {props.difficulty}</PretendardedText>
    </View>
  );
};

const styles = StyleSheet.create({});
