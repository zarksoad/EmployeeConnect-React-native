import {useEffect, useState} from 'react';
import {getContact} from '../services/getContactService';
import {Contact} from '../services/getAllContactsService';

export const useContact = (contactId: number) => {
  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const data = await getContact(contactId);
        if (data) {
          setContact(data);
        } else {
          setError('Contact not found');
        }
      } catch (err) {
        console.error('Failed to fetch contact:', err);
        setError('Failed to fetch contact');
      } finally {
        setLoading(false);
      }
    };

    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  return {contact, loading, error};
};
