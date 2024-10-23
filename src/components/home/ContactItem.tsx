import React from 'react';
import {Image, Pressable, Text} from 'react-native';
import styles from '../../screens/home/HomeView.style';
import {Contact} from '../../services/getAllContactsService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onPress: (id: number) => void;
}

type NavigationContact = NativeStackNavigationProp<
  RootStackParamList,
  'ContactPage'
>;

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  isSelected,
  onPress,
}) => {
  const navigation = useNavigation<NavigationContact>();

  const handlePress = () => {
    if (contact.id !== undefined) {
      onPress(contact.id);
      navigation.navigate('ContactPage', {contactId: contact.id});
    } else {
      console.warn(`Contact Id is undefined for ${contact.name}`);
    }
  };

  const defaultImageUri = require('../../assets/default-image.png');

  return (
    <Pressable
      onPress={handlePress}
      style={{
        ...styles.contactItem,
        backgroundColor: isSelected ? '#e0e0e0' : '#fff',
        transform: [{scale: isSelected ? 1.05 : 1}],
      }}>
      <Image
        source={require('../../assets/default-image.png')}
        style={{width: 50, height: 50, borderRadius: 25}}
      />
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
    </Pressable>
  );
};

export default ContactItem;
