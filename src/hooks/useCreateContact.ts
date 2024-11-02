import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {createContactService} from '../services/createContactService';
import {ICreateContact} from '../services/types/contactType';

type NavigationCreateContactProps = NativeStackNavigationProp<
  RootStackParamList,
  'CreateContact'
>;

export const useCreateContact = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationCreateContactProps>();

  const validateContact = (contact: ICreateContact) => {
    const {name, email, phone} = contact;

    if (!name) {
      return 'Name is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      return 'Valid email is required';
    }

    if (!phone) {
      return 'Phone number is required';
    }

    return null;
  };

  const createContact = async (contact: ICreateContact) => {
    console.log('Data sent to service:', contact);
    setIsLoading(true);
    setError(null);
    const validationError = validateContact(contact);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      await createContactService(contact);
      navigation.navigate('Home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {createContact, isLoading, error};
};
