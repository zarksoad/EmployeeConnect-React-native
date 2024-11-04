import React from 'react';
import {
  ActivityIndicator,
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
import {Icon, Text} from '@ui-kitten/components';
import WeatherEmojiComponent from '../../components/weather/WeatherEmoji';
import ContactMap from '../../components/singleContact/contactMap';

export type ContactPageRouteProp = RouteProp<RootStackParamList, 'ContactPage'>;
export type UpdateContactRoutePageProp = NativeStackNavigationProp<
  RootStackParamList,
  'UpdateContactPage'
>;

export interface ContactPageProps {
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
              navigation.goBack();
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
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (deleteError) {
    return (
      <View style={styles.container}>
        <Text>Error deleting contact: {deleteError}</Text>
      </View>
    );
  }

  if (!contact) {
    return (
      <View style={styles.container}>
        <Text>No contact found</Text>
      </View>
    );
  }

  const defaultImageUri = require('../../assets/default-image.png');

  return (
    <View style={styles.container}>
      <View style={styles.contactCard}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={navigateToUpdate}>
            <Icon name="edit" style={[styles.icon, styles.updateIcon]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <Icon name="trash-2" style={[styles.icon, styles.trashIcon]} />
          </TouchableOpacity>
        </View>
        <Image
          source={contact.imageUri ? {uri: contact.imageUri} : defaultImageUri}
          style={styles.contactImage}
        />
        <Text style={styles.contactName}>{contact.name}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.infoLabel}>Contact Info:</Text>
          <Text style={styles.infoText}>
            <Icon name="phone" style={styles.infoIcon} />
            {contact.phone}
          </Text>
          <Text style={styles.infoText}>
            <Icon name="email" style={styles.infoIcon} />
            {contact.email}
          </Text>
        </View>

        {contact.latitude && contact.longitude ? (
          <View style={styles.locationContainer}>
            <WeatherEmojiComponent
              lat={contact.latitude}
              lon={contact.longitude}
            />
            <ContactMap
              latitude={contact.latitude}
              longitude={contact.longitude}
            />
          </View>
        ) : (
          <Text>No map available for this contact.</Text>
        )}
      </View>
    </View>
  );
};

export default ContactPage;
