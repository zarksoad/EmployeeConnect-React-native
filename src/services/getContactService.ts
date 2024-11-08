import {API_URL} from '@env';
import axios from 'axios';
import {Contact} from './types/contactType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getContact = async (
  contactId: number,
): Promise<Contact | undefined> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await axios.get(`${API_URL}/api/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.data as Contact;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching contact from API:', error.message);
    } else {
      console.error('Unexpected error fetching contact:', error);
    }
    return undefined;
  }
};
