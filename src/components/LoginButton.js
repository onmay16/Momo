import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

const LoginButton = () => {
	const dispatch = useDispatch();

	function testLogin() {
		dispatch({ type: 'user/login', payload: 'User logged in.' });
	}

	return (
		<View>
			<TouchableOpacity
				style={styles.button}
				onPress={testLogin}
			>
				<Text
					style={styles.text}
				>
					로그인
				</Text>
			</TouchableOpacity>
		</View>
	);
};


const styles = StyleSheet.create({
	button: {
		backgroundColor: '#3CE3AC',
		width: 329,
		height: 56,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 14,
	},
});

export default LoginButton;
