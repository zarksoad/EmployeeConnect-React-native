import React, {useState} from 'react';
import {useCreateContact} from '../../hooks/useCreateContact';
import {Alert, View, Button, Text, TextInput, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import styles from './createContact-styles';
import {getNextId} from '../../commun/nextId/nextId';
import MapboxGL, {MapView} from '@rnmapbox/maps';

import {
  checkOrRequestCameraPermission,
  checkOrRequestGalleryPermissions,
  openGallery,
} from '../../commun/nextId/permisions/checkOrOpen';

type NavigationCreateContactProps = NativeStackNavigationProp<
  RootStackParamList,
  'CreateContact'
>;

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiemFya3NvYWQiLCJhIjoiY20ydGl4MXRuMDNsaTJqcHZrMmdoeGNqMiJ9.yjfZlsKH9gLRr4cz8SkzOg',
);

const CreateContactForm: React.FC = () => {
  const {createContact, isLoading, error} = useCreateContact();
  const navigation = useNavigation<NavigationCreateContactProps>();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

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
    const id = await getNextId();
    await createContact({id, name, phone, email, imageUri});

    if (!error) {
      Alert.alert('Success', 'Contact added successfully');
      setName('');
      setPhone('');
      setEmail('');
      setImageUri(null);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', error || 'Failed to create contact');
    }
  };

  return (
    <View style={styles.container}>
      <View>
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
          placeholderTextColor="blue"
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}

        <Button
          title="Take Photo"
          onPress={() => checkOrRequestCameraPermission(setImageUri)}
        />
        <Button
          title="Select from Gallery"
          onPress={() => checkOrRequestGalleryPermissions(setImageUri)}
        />

        <Button
          title={isLoading ? 'Adding...' : 'Add Contact'}
          onPress={handleSubmit}
          disabled={isLoading}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <View style={styles.containerMap}>
        <MapView style={styles.map} />
      </View>
    </View>
  );
};

export default CreateContactForm;
