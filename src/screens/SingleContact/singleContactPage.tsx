import React, {useState} from 'react';
import {ActivityIndicator, Text, View, Button, Alert} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useContact} from '../../hooks/useGetContact';
import {useDeleteContact} from '../../hooks/useDeleteContact';

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

  return (
    <View>
      <Text>Welcome to Contact Page</Text>
      <Text>Contact Name: {contact.name}</Text>
      <Text>Contact Phone: {contact.phone}</Text>
      <Text>Contact Email: {contact.email}</Text>
      <Button title="Delete Contact" onPress={handleDelete} />
    </View>
  );
};

export default ContactPage;
