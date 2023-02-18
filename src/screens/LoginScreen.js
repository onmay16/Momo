import React from 'react';
import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

import LogoImage from '../assets/images/Logo.png';
import LoginButton from '../components/LoginButton';
import InputForm from '../components/InputForm';
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginScreen = () => {
  return (
    <View style={styles.contianer}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={{marginTop: 50}} source={LogoImage} />
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <InputForm />
          <LoginButton />
        </View>

        <View
          style={{
            flex: 0.8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, marginBottom: 20, color: '#222222'}}>
            간편로그인
          </Text>
          <GoogleLoginButton />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 329,
    height: 53,
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 14,
    borderColor: '#EEEEEE',
    marginBottom: 10,
    paddingLeft: 15,
  },
});

export default LoginScreen;
