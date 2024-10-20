import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from '../screens/HomeView.style';
import {Contact} from '../services/contactService';

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onPress: (id: number) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress(contact.id)}
      style={{
        ...styles.contactItem,
        backgroundColor: isSelected ? '#e0e0e0' : '#fff',
        transform: [{scale: isSelected ? 1.05 : 1}],
      }}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
      <Text style={styles.contactEmail}>{contact.email}</Text>
    </Pressable>
  );
};

export default ContactItem;
