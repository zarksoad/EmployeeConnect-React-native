import axios from 'axios';
import {Alert} from 'react-native';
import {ICreateContact} from './types/contactType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const transformContacts = (rawContacts: any[]): ICreateContact[] => {
  return rawContacts
    .map(contact => ({
      name: contact.displayName || 'contact',
      phone: contact.phoneNumbers[0]?.number || '',
      email: contact.emailAddresses[0]?.email || '',
      imageUri: contact.thumbnailPath || null,
    }))
    .filter(contact => contact.name);
};

export const uploadContacts = async (contacts: ICreateContact[]) => {
  const token = await AsyncStorage.getItem('accessToken');

  try {
    const arrayContacts = contacts.map(contact => ({
      ...contact,
    }));
    const response = await axios.post(
      `https://closetoyoureactnativebackend.onrender.com/api/contacts/batch`,
      arrayContacts,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error uploading contacts:', error.message);
    }
    Alert.alert('Error', 'Failed to upload contacts.');
  }
};
