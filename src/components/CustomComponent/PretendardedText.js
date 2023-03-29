import { Text } from 'react-native';
import React from 'react';

export const PretendardedText = (props) => {
    return (
        <Text
            {...props}
            style={{
                ...props.style,
                fontFamily: 'Pretendard-Medium',
            }}>
            {props.children}
        </Text>
    );
};
