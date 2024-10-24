import React, {useState} from 'react';
import {Alert, View, Button, Text, TextInput, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../App';
import {useCreateContact} from '../../../hooks/useCreateContact';
import styles from '../../create/createContact-styles';

const ID_COUNTER_KEY = '@contact_id_counter';

const getNextId = async (): Promise<number> => {
  try {
    const currentId = await AsyncStorage.getItem(ID_COUNTER_KEY);
    const newId = currentId ? parseInt(currentId) + 1 : 1;
    await AsyncStorage.setItem(ID_COUNTER_KEY, newId.toString());
    return newId;
  } catch (error) {
    console.error('Error retrieving or saving ID counter:', error);
    return 1;
  }
};

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

  const openCamera = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
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

        <Button title="Take Photo" onPress={openCamera} />
        <Button title="Select from Gallery" onPress={openGallery} />

        <Button
          title={isLoading ? 'Adding...' : 'Add Contact'}
          onPress={handleSubmit}
          disabled={isLoading}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

export default CreateContactForm;
