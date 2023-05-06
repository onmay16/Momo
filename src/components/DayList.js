import {StyleSheet, Text, View} from 'react-native';

const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

const DayList = (props) => {

  const getContainerStyles = (isActive, position) => {
    const borderRadius = {
      borderTopLeftRadius: position === 1 ? 3 : 0,
      borderBottomLeftRadius: position === 1 ? 3 : 0,
      borderTopRightRadius: position === 7 ? 3 : 0,
      borderBottomRightRadius: position === 7 ? 3 : 0,
    };
    const backgroundColor = isActive ? '#3CE3AC' : '#EEEEEE';
    return {...styles.dayContainerStyle, ...borderRadius, backgroundColor};
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {DAYS_OF_WEEK.map((day, index) => (
        <View key={index} style={getContainerStyles(props.active_day[index], index + 1)}>
          <Text style={{fontSize: 11.67, fontWeight: '600', color: props.active_day[index] ? '#FFFFFF' : '#B3B3B3' }}>
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  dayContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    width: 20,
    height: 20,
    borderRadius: 3,
  },
});

export default DayList;
