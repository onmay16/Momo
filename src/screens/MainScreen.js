import { Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducerSlices/userSlice';

const MainScreen = () => {
    const dispatch = useDispatch();

    function testLogout() {
        dispatch(logout());
    }

    return (
        <View>
            <Text>MainScreen</Text>
            <Text onPress={testLogout}>Go back</Text>
        </View>
    );
};

export default MainScreen;
