// services/contactService.ts
import axios from 'axios';
import {Contact} from '../services/types/contactType';
import {API_URL} from '@env';

export const updateContactService = async (
  updatedContact: Contact,
  contactId: string,
): Promise<void> => {
  try {
    //coment
    await axios.put(`${API_URL}/contacts/${contactId}`, updatedContact);
    console.log('I arrive to the service ');
  } catch (error) {
    throw new Error('Failed to update contact');
  }
};
