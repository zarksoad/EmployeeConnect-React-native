import axios from 'axios';
import {Contact} from './contactService';

export const createContactService = async (
  contact: Contact,
): Promise<Contact | undefined> => {
  try {
    const response = await axios.post(
      'http://192.168.89.115:3000/contacts',
      contact,
    );
    console.log(contact);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating the contact', error);
      throw error;
    }
  }
};
