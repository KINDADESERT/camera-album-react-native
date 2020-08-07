import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ButtonPlus({name = 'plus', size, text, styles, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles]}>
            <FontAwesome name={name} size={size}/>
            {text && <Text>{text}</Text>}
        </TouchableOpacity>
    )
}
