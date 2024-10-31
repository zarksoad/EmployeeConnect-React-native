import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from '../../screens/home/HomeView.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import {Contact} from '../../services/types/contactType';

interface ContactItemProps {
  contact: Contact;
  onPress: (id: number) => void;
}

type NavigationContact = NativeStackNavigationProp<
  RootStackParamList,
  'ContactPage'
>;

const ContactItem: React.FC<ContactItemProps> = ({contact, onPress}) => {
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
      }}>
      <View>
        <Image
          source={contact.imageUri ? {uri: contact.imageUri} : defaultImageUri}
          style={{width: 50, height: 50, borderRadius: 25}}
        />
        <Text style={styles.contactName}>{contact.name}</Text>
      </View>
      <View>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
        <Text style={styles.contactPhone}>{contact.email}</Text>
      </View>
    </Pressable>
  );
};

export default ContactItem;
