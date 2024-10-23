import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACTS_KEY} from './createContact';
import {Contact} from './getAllContactsService';

export const getContact = async (
  contactId: number,
): Promise<Contact | undefined> => {
  try {
    const jsonContacts = await AsyncStorage.getItem(CONTACTS_KEY);
    if (jsonContacts !== null) {
      try {
        const contactsGet: Contact[] = JSON.parse(jsonContacts);
        const contact = contactsGet.find(contact => contact.id === contactId);
        return contact;
      } catch (parseError) {
        console.error('Error parsing contacts:', parseError);
        return undefined;
      }
    } else {
      console.log('No contacts found');
      return undefined;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching contacts:', error);
    }
    return undefined;
  }
};
