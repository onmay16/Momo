import { StyleSheet, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateRoutineStatus } from '../redux/reducerSlices/userRoutineSlice';
import { updateExp } from '../redux/reducerSlices/userSlice';
import { setPhotoModalStatus } from '../redux/reducerSlices/modalSlice';

import { PretendardedText } from './CustomComponent/PretendardedText';

import incompleteAction from '../assets/images/action_incomplete.png';
import completeAction from '../assets/images/action_complete.png';

const Action = (props) => {
    const dispatch = useDispatch();
    const routineListState = useSelector(state => state.userRoutineSlice.userRoutineActionList);
    const routine = routineListState.find(r => r.id === props.id);

    function handleCompleteStatus(action) {
        const amount = (9 + routine.streak) * routine.difficulty;
        if (!routine.complete) {
            dispatch(updateExp({ case: 'INCREMENT_EXP', amount: amount }));
            props.setAnimatedPoint(amount);
            props.pointAnimation();
            dispatch(setPhotoModalStatus({
                status: true,
            }));
        } else {
            dispatch(updateExp({ case: 'DECREMENT_EXP', amount: amount }));
            props.setAnimatedPoint(0);
        }
        dispatch(updateRoutineStatus(action));
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <PretendardedText style={styles.actionName}>{routine.name}</PretendardedText>
            </View>
            <Pressable onPress={() => handleCompleteStatus(props.id)}>
                <Image source={routine.complete ? completeAction : incompleteAction} style={{ marginRight: 14 }} />
            </Pressable>
        </View>
    );
};

export default Action;

const styles = StyleSheet.create({
    container: { width: '100%', height: 92, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
    left: { flexDirection: 'row', alignItems: 'center' },
    actionName: { fontWeight: '700', fontSize: 16, color: '#4C4C4C', marginLeft: 14 },
});
