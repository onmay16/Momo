import { StyleSheet, Text, View, Pressable, Modal, SafeAreaView } from "react-native";
import React from "react";

import PretendardedText from "../CustomComponent/PretendardedText";

import BackIcon from '../../assets/icons/light/backIcon.svg';

export const RoutineAddList = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}>
      <SafeAreaView>
        <Pressable style={{ flexDirection: 'row'}}>
          <Pressable onPress={() => props.setVisible(false)}>
            <BackIcon />
          </Pressable>
          <PretendardedText>루틴 추가하기</PretendardedText>
        </Pressable>
        <PretendardedText>루틴 목록</PretendardedText>
        
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({});
