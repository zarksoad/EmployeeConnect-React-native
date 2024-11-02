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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

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
    await createContact({name, phone, email, imageUri});
    if (!error) {
      Alert.alert('Success', 'Contact added successfully');
      setName('');
      setPhone('');
      setEmail('');
      setImageUri(null);
      setLatitude(null);
      setLongitude(null);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', error || 'Failed to create contact');
    }
  };

  return (
    <View style={styles.container}>
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

      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      <Pressable
        style={styles.button}
        onPress={() => checkOrRequestCameraPermission(setImageUri)}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => checkOrRequestGalleryPermissions(setImageUri)}>
        <Text style={styles.buttonText}>Select from Gallery</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setShowMap(true)}>
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

      <MapPage visible={showMap} onClose={() => setShowMap(false)} />
    </View>
  );
};

export default CreateContactForm;
