import {Alert, Pressable, TextInput, View, Text} from 'react-native';
import styles from './login.style';
import {Icon} from '@ui-kitten/components';
import {useState} from 'react';
import useRegister from '../../hooks/useRegisterContact';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type NavigationLoginProps = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

const RegisterView = () => {
  const navigation = useNavigation<NavigationLoginProps>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const {handleRegister, isLoading, error} = useRegister();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }

    try {
      console.log('start registering');
      const response = await handleRegister(email, password);
      if (response) {
        Alert.alert('Registration Successful', 'You can now log in.');
        navigation.navigate('login');
      }
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <Pressable style={styles.inputContainer}>
        <Icon name="lock" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="blue"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable
        onPress={handleSubmit}
        style={[styles.button, isLoading && styles.disabledButton]}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Registering...' : 'Register'}
        </Text>
      </Pressable>
    </View>
  );
};

export default RegisterView;
