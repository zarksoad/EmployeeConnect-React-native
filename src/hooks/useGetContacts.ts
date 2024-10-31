import {useState} from 'react';
import React from 'react';
import {getContacts} from '../services/getAllContactsService';
import {useFocusEffect} from '@react-navigation/native';
import {Contact} from '../services/types/contactType';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchContacts = async () => {
        setLoading(true);
        try {
          const data = await getContacts();
          console.log('Fetched contacts:', data); // Log fetched contacts
          if (data) {
            setContacts(data);
          }
        } catch (err) {
          console.error('Failed to fetch contacts:', err);
          setError('Failed to fetch contacts');
        } finally {
          setLoading(false);
        }
      };

      fetchContacts();
    }, []),
  );

  return {contacts, loading, error};
};
