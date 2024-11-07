import {API_URL} from '@env';
import axios from 'axios';
import {Contact} from './types/contactType';

export const getContact = async (
  contactId: number,
): Promise<Contact | undefined> => {
  try {
    // comment
    const response = await axios.get(`${API_URL}/contacts/${contactId}`);
    console.log(contactId);
    return response.data as Contact;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching contact from API:', error.message);
    } else {
      console.error('Unexpected error fetching contact:', error);
    }
    return undefined;
  }
};
