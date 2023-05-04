import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import Dust from '../../assets/character/1Dust.svg';
import Cloud from '../../assets/character/2Cloud.svg';
import Face from '../../assets/character/3Face.svg';
import Body from '../../assets/character/4Body.svg';
import White from '../../assets/character/5White.svg';
import Red from '../../assets/character/6Red.svg';
import Orange from '../../assets/character/7Orange.svg';
import Yellow from '../../assets/character/8Yellow.svg';
import Green from '../../assets/character/9Green.svg';
import Blue from '../../assets/character/10Blue.svg';
import Violet from '../../assets/character/11Violet.svg';

export const Momo = () => {
  const userState = useSelector(state => state.user);

  const renderMomo = () => (
    userState.level === 1 ? <Dust/> :
    userState.level === 2 ? <Cloud/> :
    userState.level === 3 ? <Face/> :
    userState.level === 4 ? <Body/> :
    userState.level === 5 ? <White/> :
    userState.level === 6 ? <Red/> :
    userState.level === 7 ? <Orange/> :
    userState.level === 8 ? <Yellow/> :
    userState.level === 9 ? <Green/> :
    userState.level === 10 ? <Blue/> : <Violet/>
  );

  return (
    <View style={styles.container}>
      {renderMomo(userState.level)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});
