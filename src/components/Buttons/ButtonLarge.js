import { Pressable, StyleSheet } from "react-native";

import { PretendardedText } from "../CustomComponent/PretendardedText";

import DefaultBell from '../../assets/icons/light/buttonBellDefault.svg';
import DisabledBell from '../../assets/icons/light/buttonBellDisabled.svg';
import LightBell from '../../assets/icons/light/buttonBellLight.svg';
import RedBell from '../../assets/icons/light/buttonBellRed.svg';

export const ButtonLarge = (props) => {

  return (
    <Pressable style={customSytles(props.type).button} onPress={props.action}>
      {props.icon ? ( props.type === 'disable' ? <DisabledBell/> : (props.type === 'light' ? <LightBell/> : ( props.type === 'red' ? <RedBell/> : <DefaultBell/> ))) : null}
      <PretendardedText style={customSytles(props.type).text}>{props.text}</PretendardedText>
    </Pressable>
  );
};

const customSytles = (type) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: '80%',
    height: 56,
    // height: '10%',
    backgroundColor: type === 'red' ? '#FFFFFF' : ( type === 'dark' ? '#168862' : ( type === 'disabled' ? '#EEEEEE' : ( type === 'light' ? '#CAF4E6' : '#3CE3AC' ))),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: type === 'red' ? '#FF6056' : null,
    borderWidth: type === 'red' ? 1.5 : 0,
  },
  text: {
    fontWeight: type === 'red' ? 600 : 700,
    fontSize: 14,
    color: type === 'red' ? '#FF6056' : ( type === 'disabled' ? '#D9D9D9' : ( type === 'light' ? '#4C4C4C' : '#222222' )),
  },
});
