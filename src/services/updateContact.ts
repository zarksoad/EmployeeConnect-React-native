import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACTS_KEY} from './createContact';
import {Contact} from './getAllContactsService';

// Function to update a contact in AsyncStorage
export const updateContactService = async (
  updatedContact: Contact,
): Promise<void> => {
  try {
    // Fetch the stored contacts
    const jsonContacts = await AsyncStorage.getItem(CONTACTS_KEY);

    if (jsonContacts !== null) {
      // Parse the contacts into an array
      const contacts: Contact[] = JSON.parse(jsonContacts);

      // Find the index of the contact to update
      const contactIndex = contacts.findIndex(
        contact => contact.id === updatedContact.id,
      );

      if (contactIndex !== -1) {
        // Update the contact at the found index
        contacts[contactIndex] = updatedContact;

        // Store the updated contacts back into AsyncStorage
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
    // Handle any errors that occur during the update process
    console.error('Error updating contact:', error);
    throw new Error('Failed to update contact');
  }
};
