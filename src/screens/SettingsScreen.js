import { StyleSheet, View, Switch, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { PretendardedText } from '../components/CustomComponent/PretendardedText';
import { ButtonLarge } from '../components/Buttons/ButtonLarge';

import { logout } from '../redux/reducerSlices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const dispatch = useDispatch();

    function logout() {
        dispatch(logout());
        AsyncStorage.clear();
    }

    function test() {
        alert('test')
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F9F9F9'}}>
            <SafeAreaView style={{ flex: 1, alignItems: 'center', width: '100%', }}>
                <PretendardedText style={styles.header}>환경설정</PretendardedText>
                <View style={styles.buttons}>
                    <ButtonLarge type={'default'} text={'66팀 이야기'} icon={false} action={test} />
                    <ButtonLarge style={styles.button} type={'dark'} text={'모모스토리'} icon={false} action={test} />
                    <ButtonLarge style={styles.button} type={'disabled'} text={'즉각 피드백'} icon={false} action={test} />
                    <ButtonLarge style={styles.button} type={'light'} text={'출시 알림 받기'} icon={true} action={test} />
                    <ButtonLarge style={styles.button} type={'red'} text={'로그아웃'} icon={false} action={logout} />
                <View style={styles.toggleRow}>
                        <PretendardedText style={styles.toggleText}>사진으로 인증하기</PretendardedText>
                        <Switch
                            trackColor={{ false: '#595959', true: '#3CE3AC' }}
                            thumbColor={isEnabled ? '#FFFFFF' : '#B3B3B3'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        fontWeight: 700,
        fontSize: 16,
        color: '#222222',
        marginTop: 30,
        marginBottom: 30,
    },
    buttons: {
        width: '100%',
        alignItems: 'center',
        flex: 0.85,
        justifyContent: 'space-between',
        backgroundColor: '#F9F9F9',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    toggleText: {
        fontWeight: 700,
        fontSize: 16,
    },
});
