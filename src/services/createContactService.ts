import axios from 'axios';
import {ICreateContact} from './types/contactType';
import {API_URL} from '@env';

export const createContactService = async (
  contact: ICreateContact,
): Promise<void> => {
  try {
    //comment
    console.log(contact, 'contactServices');
    const response = await axios.post(`${API_URL}/contacts`, contact);

    if (response.status === 201 || response.status === 200) {
      console.log('Contact successfully saved:', response.data);
    } else {
      console.error('Failed to save contact. Status:', response.status);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating the contact:', error);
      throw error;
    }
  }
};
