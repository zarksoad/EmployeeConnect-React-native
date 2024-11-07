// hooks/useLogin.ts
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginService} from '../services/loginContactService';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const {accessToken} = await loginService(email, password);
      await AsyncStorage.setItem('accessToken', accessToken);
    } catch (err: any) {
      console.error('Error during login:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return {login, isLoading, error};
};

export default useLogin;
