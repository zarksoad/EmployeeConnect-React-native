import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text, Icon} from '@ui-kitten/components';
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
    if (contact && contact.id !== undefined) {
      onPress(contact.id);
      navigation.navigate('ContactPage', {contactId: contact.id});
    } else {
      console.warn(
        `Contact Id is undefined for ${contact?.name || 'Unknown Contact'}`,
      );
    }
  };

  const defaultImageUri = require('../../assets/default-image.png');

  return (
    <Pressable onPress={handlePress} style={styles.contactItem}>
      <View style={styles.containerImage}>
        <Image
          source={contact?.imageUri ? {uri: contact.imageUri} : defaultImageUri}
          style={styles.contactImage}
        />
      </View>
      <View style={styles.contactDetails}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="person"
            style={{
              width: 20,
              height: 20,
              marginRight: 4,
            }}
          />
          <Text style={styles.contactName}>
            {contact?.name || 'Unnamed Contact'}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
          <Icon name="phone" style={{width: 20, height: 20, marginRight: 4}} />
          <Text style={styles.contactPhone}>
            {contact?.phone || 'No Phone'}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
          <Icon name="email" style={{width: 20, height: 20, marginRight: 4}} />
          <Text style={styles.contactEmail}>
            {contact?.email || 'No Email'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactItem;
