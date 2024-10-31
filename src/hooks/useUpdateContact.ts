import {useState} from 'react';
import {Alert} from 'react-native';
import {Contact} from '../services/types/contactType';
import {updateContactService} from '../services/updateContactService';

export const useUpdateContact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateContact = async (
    contact: Contact,
    contactId: string,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await updateContactService(contact, contactId);
      Alert.alert('Success', 'Contact updated successfully!');
    } catch (e) {
      setError('Failed to update contact');
      Alert.alert('Error', 'Failed to update contact');
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
