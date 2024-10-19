import {useEffect, useState} from 'react';
import {Contact, getContacts} from '../services/contactService';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        if (data) {
          setContacts(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('error fetching contacts');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);
  return {contacts, loading};
};
