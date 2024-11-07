import {Pressable, StyleSheet, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {Icon} from '@ui-kitten/components';

type NavigationRegisterProps = NativeStackNavigationProp<
  RootStackParamList,
  'register'
>;

const RegisterButton: React.FC = () => {
  const navigation = useNavigation<NavigationRegisterProps>();

  const navigateToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <Pressable style={styles.button} onPress={navigateToRegister}>
      <Icon name="person-add" style={styles.icon} />
      <Text style={styles.buttonText}>Register</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    backgroundColor: '#66b2ff',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 5,
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

export default RegisterButton;
