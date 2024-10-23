import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACTS_KEY} from './createContact';
import {Contact} from './getAllContactsService';

export const deleteContact = async (contactId: number): Promise<void> => {
  try {
    const jsonContacts = await AsyncStorage.getItem(CONTACTS_KEY);
    if (jsonContacts !== null) {
      const contacts: Contact[] = JSON.parse(jsonContacts);
      const updatedContacts = contacts.filter(
        contact => contact.id !== contactId,
      );
      await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(updatedContacts));
      console.log(`Contact with id ${contactId} deleted successfully`);
    } else {
      console.log('No contacts found to delete');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
};
