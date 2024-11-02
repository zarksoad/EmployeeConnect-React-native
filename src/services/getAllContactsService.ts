import axios from 'axios';
import {Contact} from './types/contactType';
import {API_URL} from '@env';

export const getContacts = async (): Promise<Contact[]> => {
  try {
    //contacts
    const response = await axios.get(`${API_URL}/contacts`);
    if (response.status === 200) {
      const contactsGet: Contact[] = response.data;
      return contactsGet;
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
