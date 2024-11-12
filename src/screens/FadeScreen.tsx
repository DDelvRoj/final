import React from 'react';
import {Animated, Button, View} from 'react-native';
import { UseFade } from '../hooks/UseFade';

export const FadeScreen = () => {
    const {opacity, fadeIn, fideOut} = UseFade()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          backgroundColor: '#084F6A',
          width: 150,
          height: 150,
          borderColor: 'white',
          borderWidth: 10,
          marginBottom: 10,
          opacity: opacity,
        }}
      />

      <Button title="fadeIn" onPress={()=>fadeIn()} />
      <Button title="fideOut" onPress={()=>fideOut()} />
    </View>
  );
};
