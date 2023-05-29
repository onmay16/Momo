import { StyleSheet, ScrollView, View } from "react-native";
import React from "react";
import Dash from 'react-native-dash';
import { useSelector, useDispatch } from 'react-redux';

import { PretendardedText } from "../CustomComponent/PretendardedText";

import TodayPointFire from '../../assets/images/todayPointFire.svg';

export const TodayFeedback = () => {
  const userRoutineState = useSelector(state => state.userRoutineSlice);

  return (
    <View style={styles.actionsList}>
      <ScrollView style={{ width: '100%', flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.feedbackContainer}>
          <View style={styles.feedbackItem}>
            <PretendardedText style={styles.feedbackItemTitle}>총 소요 시간</PretendardedText>
            <Dash style={{width:'50%', height:1}} dashColor="whitesmoke" dashStyle={{ borderRadius: 5}} dashGap={4}/>
            {/* grey */}
            <PretendardedText style={styles.feedbackItemContentMint}>NN분</PretendardedText>
          </View>
          <View style={styles.feedbackItem}>
            <PretendardedText style={styles.feedbackItemTitle}>오늘 얻은 경험치</PretendardedText>
            <Dash style={{width:'45%', height:1}} dashColor="whitesmoke" dashStyle={{ borderRadius: 5}} dashGap={4}/>
            <PretendardedText style={styles.feedbackItemContentMint}>{userRoutineState.pointSumOfCompleteRoutines} </PretendardedText>
            <TodayPointFire/>
          </View>
          <View style={styles.feedbackItem}>
            <PretendardedText style={styles.feedbackItemTitle}>성공한 루틴</PretendardedText>
            <Dash style={{width:'53%', height:1}} dashColor="whitesmoke" dashStyle={{ borderRadius: 5}} dashGap={4}/>
            <PretendardedText style={styles.feedbackItemContentMint}>{userRoutineState.numberOfCompleteRoutines}개</PretendardedText>
          </View>
          {/* <View style={styles.feedbackItem}>
            <PretendardedText style={styles.feedbackItemTitle}>시간 외 완료</PretendardedText>
            <Dash style={{width:'51%', height:1}} dashColor="whitesmoke" dashStyle={{ borderRadius: 5}} dashGap={4}/>
            <PretendardedText style={styles.feedbackItemContentYellow}>NN개</PretendardedText>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsList: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  feedbackContainer: { width: '100%', height: 190, borderColor: '#EEEEEE', borderRadius: 12, borderWidth: 1.5, backgroundColor: 'white', marginBottom: 14, alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, paddingBottom: 20 },
  feedbackItem: { flexDirection: 'row', alignItems: 'center' },
  feedbackItemTitle: { marginRight: 12, fontSize: 14, fontWeight: '400' },
  feedbackItemContentMint: { marginLeft: 12, fontSize: 16, fontWeight: '700', color: '#3CE3AC' },
  feedbackItemContentYellow: { marginLeft: 12, fontSize: 16, fontWeight: '700', color: '#FFEA2D' },
});
