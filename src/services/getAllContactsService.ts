import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACTS_KEY} from './createContact';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  imageUri?: string | null;
}

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const jsonContacts = await AsyncStorage.getItem(CONTACTS_KEY);
    if (jsonContacts !== null) {
      try {
        const contactsGet: Contact[] = JSON.parse(jsonContacts);
        console.log('Contacts retrieved:', contactsGet);
        return contactsGet;
      } catch (parseError) {
        console.error('Error parsing contacts:', parseError);
        return []; // Return an empty array on parse error
      }
    } else {
      console.log('No contacts found');
      return []; // Return an empty array if no contacts
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching contacts:', error);
    }
    return []; // Ensure a fallback return value
  }
};
