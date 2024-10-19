import {Text, View, Image} from 'react-native';
import stylesHeader from './Header.styles';

const Header = () => {
  return (
    <View style={stylesHeader.container}>
      <Text style={stylesHeader.text}>EmployeeConnect</Text>
      <Image
        source={require('../assets/main-icon.png')}
        style={stylesHeader.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default Header;
