import {useState} from 'react';
import {deleteContact} from '../services/deleteContact';

export const useDeleteContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteContact = async (contactId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteContact(contactId);
      return true;
    } catch (err) {
      setError('Failed to delete contact');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, handleDeleteContact};
};
