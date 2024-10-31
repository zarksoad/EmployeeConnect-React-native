import axios from 'axios';
import {Contact} from './types/contactType';
import {API_URL} from '@env';

export const createContactService = async (contact: Contact): Promise<void> => {
  try {
    //to do
    const response = await axios.post(`${API_URL}/contacts`, contact);

    if (response.status === 201 || response.status === 200) {
      console.log('Contact successfully saved:', response.data);
    } else {
      console.error('Failed to save contact. Status:', response.status);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating the contact:', error);
      throw error; // Propagate the error
    }
  }
};
