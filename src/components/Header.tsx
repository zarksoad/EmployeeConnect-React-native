import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesHeader from './Header.styles';
import LogoutButton from './auth/logout';

const Header = () => {
  const [hasToken, setHasToken] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    setHasToken(!!token);
  };

  useEffect(() => {
    const unsubscribe = setInterval(() => {
      checkToken();
    }, 500); // Chequea el token cada 500ms
    return () => clearInterval(unsubscribe); // Limpia el intervalo
  }, []);

  return (
    <View style={stylesHeader.container}>
      <Image
        source={require('../assets/main-icon.png')}
        style={stylesHeader.image}
        resizeMode="cover"
      />
      <Text style={stylesHeader.text}>CloseToYou</Text>
      {hasToken && <LogoutButton />}
    </View>
  );
};

export default Header;
