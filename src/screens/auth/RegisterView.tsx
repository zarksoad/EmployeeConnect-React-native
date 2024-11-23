import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import styles from './auth.style';
import {Icon} from '@ui-kitten/components';
import useRegister from '../../hooks/useRegisterContact';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import LoginButton from '../../components/auth/LoginButton';

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
      const response = await handleRegister(email, password);
      if (response) {
        Alert.alert('Registration Successful', 'You can now log in.');
        navigation.navigate('login');
      }
    } catch (err: any) {
      if (err.message.includes('already registered')) {
        Alert.alert('Duplicate Email', err.message);
      } else {
        Alert.alert('Registration Failed', err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* ActivityIndicator visible only when loading */}
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#66b2ff"
          style={styles.loading}
        />
      )}

      <Pressable style={styles.inputContainer}>
        <Icon name="person" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
      </Pressable>

      <Pressable style={styles.inputContainer}>
        <Icon name="lock" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
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
          placeholderTextColor="gray"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </Pressable>

      {/* Error message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSubmit}
          style={[styles.button, isLoading && styles.disabledButton]}
          disabled={isLoading}>
          <Icon name="person-add" style={styles.icon} />

          <Text style={styles.buttonText}>
            {isLoading ? 'Registering...' : 'Register'}
          </Text>
        </Pressable>
        <LoginButton />
      </View>
    </View>
  );
};

export default RegisterView;
