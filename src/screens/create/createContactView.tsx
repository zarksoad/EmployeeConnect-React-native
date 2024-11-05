import React, {useState} from 'react';
import {useCreateContact} from '../../hooks/useCreateContact';
import {Alert, View, Text, TextInput, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import styles from './createContact-styles';
import {
  checkOrRequestCameraPermission,
  checkOrRequestGalleryPermissions,
} from '../../commun/permisions/checkOrOpen';
import MapPage from '../maps/MapScreen';
import {Icon} from '@ui-kitten/components';

type NavigationCreateContactProps = NativeStackNavigationProp<
  RootStackParamList,
  'CreateContact'
>;

const CreateContactForm: React.FC = () => {
  const {createContact, isLoading, error} = useCreateContact();
  const navigation = useNavigation<NavigationCreateContactProps>();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Define the default image as a local asset without using URI
  const defaultImageUri = require('../../assets/default-image.png');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [showMap, setShowMap] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleSaveCoordinates = (lat: number, lon: number) => {
    setLatitude(lat);
    setLongitude(lon);
    setShowMap(false);
    Alert.alert('Coordinates Saved', `Lat: ${lat}, Lon: ${lon}`);
  };

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
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;
    console.log('Coordinates before submission:', latitude, longitude);
    await createContact({name, phone, email, imageUri, latitude, longitude});
    if (!error) {
      Alert.alert('Success', 'Contact added successfully');
      setName('');
      setPhone('');
      setEmail('');
      setImageUri(null);
      setLatitude(undefined);
      setLongitude(undefined);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', error || 'Failed to create contact');
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
        {showImageOptions && (
          <View style={styles.imageOptionsContainer}>
            <Pressable
              onPress={() => checkOrRequestCameraPermission(setImageUri)}>
              {({}) => (
                <>
                  <Icon name="camera" style={{width: 20, height: 20}} />
                </>
              )}
            </Pressable>
            <View></View>
            <Pressable
              onPress={() => checkOrRequestGalleryPermissions(setImageUri)}>
              {({}) => (
                <>
                  <Icon name="image" style={{width: 20, height: 20}} />
                </>
              )}
            </Pressable>
          </View>
        )}
      </View>
      <Pressable style={styles.inputContainer}>
        <Icon name="person" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="blue"
          value={name}
          onChangeText={setName}
        />
      </Pressable>
      <Pressable style={styles.inputContainer}>
        <Icon name="email" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="blue"
          value={email}
          onChangeText={setEmail}
        />
      </Pressable>
      <Pressable style={styles.inputContainer}>
        <Icon name="phone" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="blue"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => setShowMap(true)}>
        <Icon name="map" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Open Map</Text>
      </Pressable>

      <Pressable
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Adding...' : 'Add Contact'}
        </Text>
      </Pressable>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <MapPage
        visible={showMap}
        onClose={() => setShowMap(false)}
        onSaveCoordinates={handleSaveCoordinates}
      />
    </View>
  );
};

export default CreateContactForm;
