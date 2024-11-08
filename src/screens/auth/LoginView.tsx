import {Alert, Pressable, TextInput, View, Text} from 'react-native';
import styles from './login.style';
import {Icon} from '@ui-kitten/components';
import {useState} from 'react';
import RegisterButton from '../../components/auth/registerButton';
import useLogin from '../../hooks/useLoginContact';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';

type NavigationHome = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const LoginView = () => {
  const navigation = useNavigation<NavigationHome>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login, isLoading, error} = useLogin();
  const handleSubmit = async () => {
    await login(email, password);
    if (!error) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email input */}
      <Pressable style={styles.inputContainer}>
        <Icon name="person" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="blue"
          value={email}
          onChangeText={setEmail}
        />
      </Pressable>

      {/* Password input */}
      <Pressable style={styles.inputContainer}>
        <Icon name="lock" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="blue"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </Pressable>

      {/* Error Text - Display error message if any */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonContainer}>
        {/* Login Button */}
        <Pressable
          onPress={handleSubmit}
          style={[styles.button, isLoading && styles.disabledButton]}
          disabled={isLoading}>
          <Icon name="log-in" style={styles.icon} />
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Text>
        </Pressable>

        {/* Register Button */}
        <RegisterButton />
      </View>
    </View>
  );
};

export default LoginView;
