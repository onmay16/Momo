import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateRoutineStatus } from '../redux/reducerSlices/userRoutineSlice';
import { updateExp } from '../redux/reducerSlices/userSlice';
// import { setPhotoModalStatus } from '../redux/reducerSlices/modalSlice';

import { PretendardedText } from './CustomComponent/PretendardedText';

import IncompleteAction from '../assets/images/incompleteAction.svg';
import CompleteAction from '../assets/images/completeAction.svg';

const Action = (props) => {
    const dispatch = useDispatch();
    const routineListState = useSelector(state => state.userRoutineSlice.userRoutineActionList);
    const routine = routineListState.find(r => r.id === props.id);

    function handleCompleteStatus(action) {
        const amount = (9 + routine.streak) * routine.difficulty;
        if (!routine.complete) {
            dispatch(updateExp({ amount: amount }));
            props.setAnimatedPoint(amount);
            props.pointAnimation();
            // dispatch(setPhotoModalStatus({
            //     status: true,
            // }));
            dispatch(updateRoutineStatus(action));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <PretendardedText style={styles.actionName}>{routine.emoji} {routine.name}</PretendardedText>
            </View>
            <View style={styles.right}>
                <Pressable onPress={() => handleCompleteStatus(props.id)}>
                    {routine.complete ? <CompleteAction/> : <IncompleteAction/>}
                </Pressable>
                {routine.complete ? <PretendardedText style={styles.timeText}>{routine.executionTime}분 걸림</PretendardedText> : null}
            </View>
        </View>
    );
};

export default Action;

const styles = StyleSheet.create({
    container: { width: '100%', height: 92, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
    left: { flexDirection: 'row', alignItems: 'center' },
    right: { justifyContent: 'center', alignItems: 'center', width: '26%' },
    actionName: { fontWeight: '700', fontSize: 16, color: '#4C4C4C', marginLeft: 14 },
    timeText: { color: '#3CE3AC' },
});
