import React, {useState, useEffect} from 'react';
import {Alert, Button, Image, TextInput, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../App';
import {useContact} from '../../../hooks/useGetContact';
import {useUpdateContact} from '../../../hooks/useUpdateContact';
import {Text} from 'react-native-paper';
import styles from '../../create/createContact-styles';
import {ContactPageProps} from '../singleContactPage';
import {
  checkOrRequestCameraPermission,
  checkOrRequestGalleryPermissions,
} from '../../../commun/nextId/permisions/checkOrOpen';

type NavigationCreateContactProps = NativeStackNavigationProp<
  RootStackParamList,
  'CreateContact'
>;

const UpdateForm: React.FC<ContactPageProps> = ({route}) => {
  const {contactId} = route.params;
  const {contact} = useContact(contactId);
  const {updateContact, isLoading, error} = useUpdateContact(); //

  const navigation = useNavigation<NavigationCreateContactProps>();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
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
    };

    await updateContact(updatedContact);

    if (!error) {
      Alert.alert('Success', 'Contact updated successfully');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', error || 'Failed to update contact');
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
          placeholder="Phone"
          placeholderTextColor="blue"
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
          title={isLoading ? 'Updating...' : 'Update Contact'}
          onPress={handleSubmit}
          disabled={isLoading}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

export default UpdateForm;
