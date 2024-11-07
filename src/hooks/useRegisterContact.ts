import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {registerService} from '../services/registerContactService';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await registerService(email, password);
      // If registration is successful, save the user data in AsyncStorage
      if (response.code === 201) {
        const user = {
          email: response.data.email,
          password: response.data.password,
          id: response.data.id,
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
        return response;
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return {handleRegister, isLoading, error};
};

export default useRegister;
