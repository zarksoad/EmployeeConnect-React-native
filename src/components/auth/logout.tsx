import {Pressable, StyleSheet, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {Icon} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationLoginProps = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

const LogoutButton: React.FC = () => {
  const navigation = useNavigation<NavigationLoginProps>();

  const navigateToLogin = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      navigation.navigate('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Pressable style={styles.button} onPress={navigateToLogin}>
      <Icon name="log-out" style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#B0C4DE',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 5,
    marginTop: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
