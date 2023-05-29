import { StyleSheet, View, Animated, Dimensions, Platform, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Progress from 'react-native-progress';
import { PretendardedText } from '../CustomComponent/PretendardedText';
import { useSelector, useDispatch } from 'react-redux';

import { setRemainingTime } from '../../redux/reducerSlices/userSlice';

import { Point } from '../CustomComponent/Point';
import { Momo } from './Momo';
import { TodayRoutine } from './TodayRoutine';
import { TodayFeedback } from './TodayFeedback';

//TO-DO: replace momo.png with sleeping momo gif
import CurrentPointFire from '../../assets/images/currentPointFire.svg';
import RemainingPointFire from '../../assets/images/remainingPointFire.svg';
import ToDetailArrow from '../../assets/icons/light/toDetailArrow.svg';

export const ActiveMain = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);

    const [animatedPoint, setAnimatedPoint] = useState(0);

    const opacity = useRef(new Animated.Value(0)).current;
    const pointOpacity = useRef(new Animated.Value(0)).current;
    const pointY = useRef(new Animated.Value(100)).current;

    function mainFadeIn() {
        Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        if (userState.momoActivated) {
            mainFadeIn();
        }
    }, []);

    useEffect(() => {
        if (userState.remainingTime > 0) {
            const id = setInterval(() => {
                dispatch(setRemainingTime());
            }, 30000);
            return () => clearInterval(id);
        }
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: opacity }]}>
            <View style={styles.progressArea}>
                <Animated.View style={[{ opacity: pointOpacity }, { transform: [{ translateY: pointY }] }]}>
                    <Point amount={animatedPoint}/>
                </Animated.View>
                <View style={styles.momo}>
                    <Momo/>
                </View>
                <View style={styles.currentPointContainer}>
                    <PretendardedText style={styles.currentPoint}>{Math.floor(userState.currentPoint / userState.requiredPointToNextLevel * 100)}% </PretendardedText>
                    <CurrentPointFire />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Progress.Bar
                        progress={userState.progress}
                        height={9}
                        width={Dimensions.get('window').width * 0.65}
                        borderWidth={0}
                        color={'#32CACA'}
                        style={{ backgroundColor: '#B3B3B3' }}/>
                </View>
                <View style={styles.remainingPointContainer}>
                    <PretendardedText style={styles.remainingPoint}>다음 단계까지 </PretendardedText>
                    <PretendardedText style={styles.remainingPoint}>{userState.remainingPoint} </PretendardedText>
                    <RemainingPointFire />
                </View>
            </View>
            <View style={styles.todayRoutineContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable>
                        <PretendardedText style={customSytles(userState.remainingTime, userState.isRoutineFinished).todayRoutineText}>오늘의 루틴</PretendardedText>
                    </Pressable>
                    <Pressable>
                        <PretendardedText style={customSytles(userState.remainingTime, userState.isRoutineFinished).todayFeedbackText}>오늘의 피드백</PretendardedText>
                    </Pressable>
                </View>
                {userState.isRoutineFinished ?
                <Pressable style={styles.remainingTimeContainer}>
                    <PretendardedText style={{marginRight: 4}}>자세히</PretendardedText>
                    <ToDetailArrow/>
                </Pressable> :
                <View>
                    {userState.remainingTime >= 0 ?
                <View style={styles.remainingTimeContainer}>
                    <PretendardedText style={styles.remainingTimeText}>마칠 시간까지 </PretendardedText>
                    <PretendardedText style={customSytles(userState.remainingTime, userState.isRoutineFinished).remainingTime}>{userState.remainingTime}</PretendardedText>
                    <PretendardedText style={styles.remainingTimeText}>분</PretendardedText>
                </View> :
                <View style={styles.remainingTimeContainer}>
                    <PretendardedText style={styles.remainingTimeText}>마칠 시간 </PretendardedText>
                    <PretendardedText style={customSytles(userState.remainingTime, userState.isRoutineFinished).remainingTime}>{-userState.remainingTime}</PretendardedText>
                    <PretendardedText style={styles.remainingTimeText}>분 초과</PretendardedText>
                </View>}
                </View>
                }
            </View>
            {!userState.isRoutineFinished ?
            <TodayRoutine/> : <TodayFeedback/>}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 6, marginLeft: 30, marginRight: 30 },
    progressArea: { flex: 1, marginRight: 39, marginLeft: 39, marginBottom: 29 },
    momo: { flex: this.momoActivated ? (Platform.OS === 'ios' ? 1 : 0.5) : (Platform.OS === 'ios' ? 4 : 3), justifyContent: 'center', alignItems: 'center', zIndex: -1 },
    currentPointContainer: { flexDirection: 'row', marginBottom: 3, alignItems: 'center' },
    currentPoint: { fontWeight: '700', fontSize: 14, color: '#3CE3AC', marginRight: 2 },
    remainingPointContainer: { flexDirection: 'row', marginTop: 3, alignItems: 'center', justifyContent: 'flex-end' },
    todayRoutineContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
    remainingTimeContainer: { flexDirection: 'row', alignItems: 'center' },
    remainingTimeText: { fontSize: 14, color: '#808080', fontWeight: '500' },
    remainingPoint: { fontWeight: '400', fontSize: 12, color: '#B3B3B3' },
});

const customSytles = (remainingTime, isRoutineFinished) => StyleSheet.create({
    remainingTime: { fontSize: 14, color: remainingTime >= 0 ? '#3CE3AC' : '#FF6056', fontWeight: '600' },
    todayRoutineText: { fontWeight: '600', fontSize: 16, color: isRoutineFinished ? '#B3B3B3' : '#4C4C4C', marginRight: 10 },
    todayFeedbackText: { fontWeight: '600', fontSize: 16, color: !isRoutineFinished ? '#B3B3B3' : '#4C4C4C', marginRight: 10 },
});
