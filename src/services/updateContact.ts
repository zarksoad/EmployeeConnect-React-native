import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACTS_KEY} from './createContact';
import {Contact} from './getAllContactsService';

export const updateContact = async (updatedContact: Contact): Promise<void> => {
  try {
    const jsonContacts = await AsyncStorage.getItem(CONTACTS_KEY);
    if (jsonContacts !== null) {
      const contacts: Contact[] = JSON.parse(jsonContacts);

      const contactIndex = contacts.findIndex(
        contact => contact.id === updatedContact.id,
      );

      if (contactIndex !== -1) {
        contacts[contactIndex] = updatedContact;

        await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
        console.log(
          `Contact with id ${updatedContact.id} updated successfully`,
        );
      } else {
        console.log(`Contact with id ${updatedContact.id} not found`);
      }
    } else {
      console.log('No contacts found to update');
    }
  } catch (error) {
    console.error('Error updating contact:', error);
  }
};
