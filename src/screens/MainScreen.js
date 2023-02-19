import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from 'react-redux';

const MainScreen = () => {
    const dispatch = useDispatch();

    function testLogout() {
        dispatch({ type: 'user/logout', payload: 'User logged out.' });
    }

    return (
        <View>
            <Text>MainScreen</Text>
            <Text onPress={testLogout}>Go back</Text>
        </View>
    );
};

export default MainScreen;
