import {useState} from 'react';
import {useCreateContact} from '../../hooks/useCreateContact';
import {Alert, View, Button, Text, TextInput, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const CreateContactForm: React.FC = () => {
  const {createContact, isLoading, error} = useCreateContact();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    const id = await getNextId();
    await createContact({id, name, phone, email, imageUri});

    if (!error) {
      Alert.alert('Success', 'Contact added successfully');
      setName('');
      setPhone('');
      setEmail('');
      setImageUri(null);
    } else {
      Alert.alert('Error', error || 'Failed to create contact');
    }
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      },
    );
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />

      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
      )}

      <Button title="Take Photo" onPress={openCamera} />
      <Button title="Select from Gallery" onPress={openGallery} />

      <Button
        title={isLoading ? 'Adding...' : 'Add Contact'}
        onPress={handleSubmit}
        disabled={isLoading}
      />

      {error && <Text style={{color: 'red'}}>{error}</Text>}
    </View>
  );
};

export default CreateContactForm;
