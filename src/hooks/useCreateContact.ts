import {useState} from 'react';
import {Contact} from '../services/contactService';

const createContactHook = () => {
  const [contact, contactSet] = useState<Contact>();
};
