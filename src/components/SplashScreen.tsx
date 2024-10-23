// src/components/SplashScreen.tsx
import React, {useEffect, useRef} from 'react';
import {View, Text, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import stylesSplash from './Splash.styles';
import {RootStackParamList} from '../../App';

// Define the type for the navigation prop
type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
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
    ]).start(() => {
      navigation.replace('Home');
    });
  }, [navigation, opacity]);

  return (
    <View style={stylesSplash.container}>
      <Animated.View style={{...stylesSplash.animatedView, opacity}}>
        <Text style={stylesSplash.text}>EmployeeConnect!</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
