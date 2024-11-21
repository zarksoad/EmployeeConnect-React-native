// services/contactService.ts
import axios from 'axios';
import {Contact} from '../services/types/contactType';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateContactService = async (
  updatedContact: Contact,
  contactId: string,
): Promise<void> => {
  try {
    console.log('************************************');
    console.log('Entro en el servicio', updatedContact);
    console.log('************************************');

    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found');
      return;
    }
    await axios.patch(`${API_URL}/api/contacts/${contactId}`, updatedContact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Failed to update contact');
  }
};
