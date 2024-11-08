import axios from 'axios';
import {ICreateContact} from './types/contactType';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createContactService = async (
  contact: ICreateContact,
): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('This is the contact:', contact);

    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await axios.post(`${API_URL}/api/contacts`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      console.log('Contact successfully saved:', response.data);
    } else {
      console.error('Failed to save contact. Status:', response.status);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Axios error specific logging
      console.error('Axios error:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        response: error.response,
        config: error.config,
        code: error.code,
      });
    } else if (error instanceof Error) {
      console.error('General error:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      // Unknown error type logging
      console.error('Unknown error:', error);
    }
  }
};
