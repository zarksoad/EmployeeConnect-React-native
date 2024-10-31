import {API_URL} from '@env';
import axios from 'axios';

export const deleteContactService = async (
  contactId: number,
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/contacts/${contactId}`);
    console.log(`Contact with id ${contactId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw new Error('Failed to delete contact');
  }
};
