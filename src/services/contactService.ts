import axios from 'axios';

export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
}

export const getContacts = async (): Promise<Contact[] | undefined> => {
  try {
    const response = await axios.get('http://192.168.1.1:3000/contacts');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }
};
