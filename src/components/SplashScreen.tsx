// src/components/SplashScreen.js
import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, Image} from 'react-native';
import stylesSplash from './Splash.styles';

const SplashScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity]);

  return (
    <View style={stylesSplash.container}>
      <Animated.View style={{...stylesSplash.animatedView, opacity}}>
        {/* <Image source={require('../../assets/your-image.png')} /> */}
        <Text style={stylesSplash.text}>EmployeeConnect!</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
