import {Text, View, Image} from 'react-native';
import stylesHeader from './Header.styles';
import LogoutButton from './auth/logout';

const Header = () => {
  return (
    <View style={stylesHeader.container}>
      <Image
        source={require('../assets/main-icon.png')}
        style={stylesHeader.image}
        resizeMode="cover"
      />
      <Text style={stylesHeader.text}>CloseToYou</Text>
      <LogoutButton />
    </View>
  );
};

export default Header;
