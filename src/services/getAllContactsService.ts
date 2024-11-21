import axios from 'axios';
import {Contact} from './types/contactType';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getContacts = async (): Promise<Contact[]> => {
  try {
    //comments
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      console.error('No token found');

      return [];
    }
    const response = await axios.get(`${API_URL}/api/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const contacts: Contact[] = response.data.data;
      return contacts;
    }

    console.error('Failed to retrieve contacts. Status:', response.status);
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching contacts:', error);
    }
    return [];
  }
};
