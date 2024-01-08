import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CustomKeyboardProps = {
    onKeyPress: (key: string) => void;
};

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ onKeyPress }) => {
    const handleKeyPress = (key: string) => {
        onKeyPress(key);
};

return (
    <View>
        <View style={{ flexDirection: 'row' }}>
            {[1, 2, 3].map((num) => (
        <TouchableOpacity
            key={num}
            onPress={() => handleKeyPress(num.toString())}
        >
            <Text>{num}</Text>
        </TouchableOpacity>
        ))}
    </View>
    <View style={{ flexDirection: 'row' }}>
        {[4, 5, 6].map((num) => (
        <TouchableOpacity
            key={num}
            onPress={() => handleKeyPress(num.toString())}
        >
            <Text>{num}</Text>
        </TouchableOpacity>
        ))}
    </View>
    <View style={{ flexDirection: 'row' }}>
        {[7, 8, 9].map((num) => (
        <TouchableOpacity
            key={num}
            onPress={() => handleKeyPress(num.toString())}
        >
            <Text>{num}</Text>
    </TouchableOpacity>
        ))}
    </View>
    <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => handleKeyPress('+')}>
            <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress('0')}>
            <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress('-')}>
            <Text>-</Text>
        </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={() => handleKeyPress('完成')}>
        <Text>完成</Text>
    </TouchableOpacity>
    </View>
    );
};

export default CustomKeyboard;