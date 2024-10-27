import {useState} from 'react';
import {Alert} from 'react-native';
import {CONTACTS_KEY} from '../services/createContact';
import {Contact} from '../services/getAllContactsService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUpdateContact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateContact = async (updatedContact: Contact): Promise<void> => {
    setIsLoading(true);
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
          Alert.alert('Success');
        } else {
          setError(`Contact with id ${updatedContact.id} not found`);
        }
      } else {
        setError('No contacts found to update');
      }
    } catch (e) {
      setError('Failed to update contact');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateContact,
    isLoading,
    error,
  };
};
