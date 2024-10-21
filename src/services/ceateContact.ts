import axios from 'axios';
import {Contact} from './contactService';

export const createContactService = async (): Promise<Contact | undefined> => {
  try {
    const response = await axios.post('http://192.168.1.1:3000/contacts');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating the contact', error);
    }
  }
};
