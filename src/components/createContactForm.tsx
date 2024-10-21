import {useState} from 'react';
import {useCreateContact} from '../hooks/useCreateContact';
import {Alert, View, Button, Text, TextInput, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CreateContactForm: React.FC = () => {
  const {createContact, isLoading, error} = useCreateContact();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    await createContact({name, phone, email, imageUri: imageUri});
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
      <TextInput placeholder="name" value={name} onChangeText={setName} />
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="phone" value={phone} onChangeText={setPhone} />

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
