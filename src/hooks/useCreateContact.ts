import {useState} from 'react';
import {createContactService} from '../services/createContact';
import {Contact} from '../services/getAllContactsService';

export const useCreateContact = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createContact = async (contact: Contact) => {
    setIsLoading(true);
    setError(null);

    try {
      await createContactService(contact);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'something get wrong ');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {createContact, isLoading, error};
};
