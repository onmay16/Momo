import { StyleSheet, View, Animated, Dimensions, Platform, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as Progress from 'react-native-progress';
import { PretendardedText } from '../CustomComponent/PretendardedText';
import { useSelector } from 'react-redux';

import Action from '../Action';

//TO-DO: replace momo.png with sleeping momo gif
import Dust from '../../assets/character/1_dust.svg';
import CurrentPointFire from '../../assets/images/currentPointFire.svg';
import RemainingPointFire from '../../assets/images/remainingPointFire.svg';

export const ActiveMain = () => {

    const userState = useSelector(state => state.user);
    const userRoutineState = useSelector(state => state.userRoutineSlice);

    function calculateDuration(array) {
        const total = array.reduce((accumulator, object) => {
            if (!object.complete) {
                return accumulator + object.duration;
            }
            return accumulator;
        }, 0);
        return total;
    }

    const [currentPoint, setCurrentPoint] = useState(0);
    const [remainingPoint, setRemainingPoint] = useState(100);
    const [currentProgress, setCurrentProgress] = useState(currentPoint / (currentPoint + remainingPoint));
    const [remainingTime, setRemainingTime] = useState(0);
    // TODO: remove actionAvailable state after update complete status logic below
    const [actionAvailable, setActionAvailable] = useState([]);

    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (userState.momoActivated) {
            Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }, []);

    function updateCompleteStatus(id) {
        const updatedActions = actionAvailable.map(action => {
            if (action.id !== id) {
                return action;
            } else {
                if (!action.complete) {
                    setCurrentPoint(currentPoint + action.point);
                    setRemainingPoint(remainingPoint - action.point);
                    setRemainingTime(remainingTime - action.duration);
                } else {
                    setCurrentPoint(currentPoint - action.point);
                    setRemainingPoint(remainingPoint + action.point);
                    setRemainingTime(remainingTime + action.duration);
                }
                setCurrentProgress(currentPoint / (currentPoint + remainingPoint));
                return {
                    ...action,
                    complete: !action.complete,
                };
            }
        });
        setActionAvailable(updatedActions);
    }

    useEffect(() => {
        setCurrentProgress(currentPoint / (currentPoint + remainingPoint));
    }, [currentPoint, remainingPoint]);
    useEffect(() => {
        setRemainingTime(calculateDuration(actionAvailable, 'duration'));
    }, [actionAvailable]);

    return (
        <Animated.View style={[styles.container, { opacity: opacity }]}>
            <View style={styles.progressArea}>
                <View style={styles.momo}>
                    <Dust/>
                </View>
                <View style={styles.currentPointContainer}>
                    <PretendardedText style={styles.currentPoint}>{currentPoint} </PretendardedText>
                    <CurrentPointFire />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Progress.Bar
                        progress={currentProgress}
                        height={9}
                        width={Dimensions.get('window').width * 0.65}
                        borderWidth={0}
                        color={'#32CACA'}
                        style={{ backgroundColor: '#B3B3B3' }}/>
                </View>
                <View style={styles.remainingPointContainer}>
                    <PretendardedText style={styles.remainingPoint}>다음 단계까지 </PretendardedText>
                    <PretendardedText style={styles.remainingPoint}>{remainingPoint} </PretendardedText>
                    <RemainingPointFire />
                </View>
            </View>
            <View style={styles.todayRoutineContainer}>
                <PretendardedText style={styles.todayRoutine}>오늘의 루틴</PretendardedText>
                <View style={styles.remainingTimeContainer}>
                    <PretendardedText style={styles.remainingTimeText}>마칠 시간까지 </PretendardedText>
                    <PretendardedText style={styles.remainingTime}>{remainingTime}</PretendardedText>
                    <PretendardedText style={styles.remainingTimeText}>분</PretendardedText>
                </View>
            </View>
            <View style={styles.actionsList}>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    {userRoutineState.userRoutineActionList.map((action) => (
                        <Action id={action.id} name={action.name} complete={action.complete} updateCompleteStatus={() => updateCompleteStatus(action.id)} />
                    ))}
                </ScrollView>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 6, marginLeft: 30, marginRight: 30 },
    progressArea: { flex: 1, marginRight: 39, marginLeft: 39, marginBottom: 29 },
    momo: { flex: this.momoActivated ? (Platform.OS === 'ios' ? 1 : 0.5) : (Platform.OS === 'ios' ? 4 : 3), justifyContent: 'center', alignItems: 'center' },
    currentPointContainer: { flexDirection: 'row', marginBottom: 3, alignItems: 'center' },
    currentPoint: { fontWeight: 700, fontSize: 14, color: '#FF6056', marginRight: 2 },
    remainingPointContainer: { flexDirection: 'row', marginTop: 3, alignItems: 'center', justifyContent: 'flex-end' },
    todayRoutineContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
    todayRoutine: { fontWeight: 600, fontSize: 16, color: '#4C4C4C' },
    remainingTimeContainer: { flexDirection: 'row', alignItems: 'center' },
    remainingTimeText: { fontSize: 14, color: '#808080', fontWeight: 500 },
    remainingTime: { fontSize: 14, color: '#3CE3AC', fontWeight: 600 },
    remainingPoint: { fontWeight: 400, fontSize: 12, color: '#B3B3B3' },
    actionsList: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
