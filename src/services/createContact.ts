import AsyncStorage from '@react-native-async-storage/async-storage';
import {Contact} from './getAllContactsService';

export const CONTACTS_KEY = '@contacts_key';

export const createContactService = async (contact: Contact): Promise<void> => {
  try {
    const jsonContacts = await AsyncStorage.getItem(CONTACTS_KEY);
    let contacts: Contact[] = [];

    if (jsonContacts) {
      try {
        const parsedContacts = JSON.parse(jsonContacts);

        if (Array.isArray(parsedContacts)) {
          contacts = parsedContacts;
        } else {
          console.error('Parsed contacts is not an array:', parsedContacts);
        }
      } catch (parseError) {
        console.error('Error parsing contacts:', parseError);
      }
    }

    if (Array.isArray(contacts)) {
      contacts.push(contact);
    } else {
      console.error('Contacts variable is not an array:', contacts);
    }

    await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));

    console.log('Contacts successfully saved:', contacts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating the contact:', error);
      throw error; // Propagate the error
    }
  }
};
