import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useContact} from '../../hooks/useGetContact';
import {useDeleteContact} from '../../hooks/useDeleteContact';
import styles from './contactPage.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ContactPageRouteProp = RouteProp<RootStackParamList, 'ContactPage'>;
type UpdateContactRoutePageProp = NativeStackNavigationProp<
  RootStackParamList,
  'UpdateContactPage'
>;

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
  const navigation = useNavigation<UpdateContactRoutePageProp>();

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

  const navigateToUpdate = () => {
    navigation.navigate('UpdateContactPage', {contactId});
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
      <Text style={styles.contactName}>
        id:{contactId}
        {contact.name}
      </Text>
      <Text style={styles.contactInfo}>Phone:{contact.phone}</Text>
      <Text style={styles.contactInfo}>Email: {contact.email}</Text>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={navigateToUpdate}>
          <Text style={{color: '#fff'}}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={{color: '#fff'}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactPage;
