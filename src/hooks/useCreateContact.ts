import {useState} from 'react';
import {createContactService} from '../services/createContactService';
import {ICreateContact} from '../services/types/contactType';

export const useCreateContact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContact = async (contactData: ICreateContact): Promise<void> => {
    setIsLoading(true);
    setError(null); // Reset the error before the request

    try {
      await createContactService(contactData);
      // Successful contact creation, no error, you can return null or success message if needed
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {createContact, isLoading, error};
};
