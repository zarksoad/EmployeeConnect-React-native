import {useEffect, useState} from 'react';
import {Contact, getContacts} from '../services/getAllContactsService';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        if (data) {
          setContacts(data);
        }
        console.log('data', data);
      } catch (err) {
        console.error('Failed to fetch contacts:', err);
        setError('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return {contacts, loading, error};
};
