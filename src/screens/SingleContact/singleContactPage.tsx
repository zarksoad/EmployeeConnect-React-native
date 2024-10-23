import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useContact} from '../../hooks/useGetContact';
import {useDeleteContact} from '../../hooks/useDeleteContact';
import styles from './contactPage.style';

type ContactPageRouteProp = RouteProp<RootStackParamList, 'ContactPage'>;

interface ContactPageProps {
  route: ContactPageRouteProp;
}

const ContactPage: React.FC<ContactPageProps> = ({route}) => {
  const {contactId} = route.params;
  const {contact, loading, error} = useContact(contactId);
  const {
    loading: deleting,
    error: deleteError,
    handleDeleteContact,
  } = useDeleteContact();

  const handleDelete = () => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const success = await handleDeleteContact(contactId);
            if (success) {
              Alert.alert('Contact has been deleted');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  if (loading || deleting) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (deleteError) {
    return (
      <View>
        <Text>Error deleting contact: {deleteError}</Text>
      </View>
    );
  }

  if (!contact) {
    return (
      <View>
        <Text>No contact found</Text>
      </View>
    );
  }

  const defaultImageUri = require('../../assets/default-image.png');

  return (
    <View style={styles.container}>
      <Image
        source={contact.imageUri ? {uri: contact.imageUri} : defaultImageUri}
        style={styles.contactImage} // Apply the image style
      />
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactInfo}>Phone: {contact.phone}</Text>
      <Text style={styles.contactInfo}>Email: {contact.email}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={{color: '#fff'}}>Delete Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactPage;
