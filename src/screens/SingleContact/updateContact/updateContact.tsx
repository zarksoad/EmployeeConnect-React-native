import React, {useState, useEffect} from 'react';
import {Alert, Image, TextInput, View, Pressable} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../App';
import {useContact} from '../../../hooks/useGetContact';
import {useUpdateContact} from '../../../hooks/useUpdateContact';
import {Text} from 'react-native-paper';
import {
  checkOrRequestCameraPermission,
  checkOrRequestGalleryPermissions,
} from '../../../commun/permisions/checkOrOpen';
import MapPage from '../../maps/MapScreen';
import {Icon} from '@ui-kitten/components';
import styles from './updateContactStyle';

export type ContactPageRouteProp = RouteProp<
  RootStackParamList,
  'UpdateContactPage'
>;

export type UpdateContactRoutePageProp = NativeStackNavigationProp<
  RootStackParamList,
  'UpdateContactPage'
>;

export interface UpdateContactPageProps {
  route: ContactPageRouteProp;
}

const UpdateForm: React.FC<UpdateContactPageProps> = ({route}) => {
  const {contactId} = route.params;
  const {contact} = useContact(contactId);
  const {updateContact, isLoading, error} = useUpdateContact();
  const navigation = useNavigation<UpdateContactRoutePageProp>();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [showMap, setShowMap] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const defaultImageUri = require('../../../assets/default-image.png');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
      setImageUri(contact.imageUri || null);
      setLatitude(contact.latitude);
      setLongitude(contact.longitude);
    }
  }, [contact]);

  const validateInputs = () => {
    if (!name) {
      Alert.alert('Validation Error', 'Name is required');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      Alert.alert('Validation Error', 'Valid email is required');
      return false;
    }

    if (!phone) {
      Alert.alert('Validation Error', 'Phone number is required');
      return false;
    }

    if (latitude === undefined || longitude === undefined) {
      Alert.alert('Validation Error', 'Location is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const updatedContact = {
      id: Number(contact?.id),
      name,
      phone,
      email,
      imageUri,
      latitude,
      longitude,
    };

    await updateContact(updatedContact, contactId.toString());

    if (!error) {
      Alert.alert('Success', 'Contact updated successfully');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', error || 'Failed to update contact');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Pressable onPress={() => setShowImageOptions(!showImageOptions)}>
          <Image
            source={imageUri ? {uri: imageUri} : defaultImageUri}
            style={styles.image}
          />
        </Pressable>
      </View>
      {showImageOptions && (
        <View style={styles.imageOptionsContainer}>
          <Pressable
            onPress={() => checkOrRequestCameraPermission(setImageUri)}>
            {({pressed}) => (
              <>
                <Icon name="camera" style={{width: 20, height: 20}} />
              </>
            )}
          </Pressable>
          <View>
            <Text> choose </Text>
          </View>
          <Pressable
            onPress={() => checkOrRequestGalleryPermissions(setImageUri)}>
            {({pressed}) => (
              <>
                <Icon name="image" style={{width: 20, height: 20}} />
              </>
            )}
          </Pressable>
        </View>
      )}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="blue"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="blue"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="blue"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Pressable style={styles.button} onPress={() => setShowMap(true)}>
          {({pressed}) => (
            <>
              <Icon name="map" style={{width: 20, height: 20}} />
              <Text style={styles.buttonText}>Location</Text>
            </>
          )}
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Updating...' : 'Update Contact'}
          </Text>
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <MapPage
          visible={showMap}
          onClose={() => setShowMap(false)}
          onSaveCoordinates={(lat: number, lon: number) => {
            setLatitude(lat);
            setLongitude(lon);
            setShowMap(false);
          }}
        />
      </View>
    </View>
  );
};

export default UpdateForm;
