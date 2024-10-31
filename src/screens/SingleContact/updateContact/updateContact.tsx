import React, {useState, useEffect} from 'react';
import {Alert, Image, TextInput, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../App';
import {useContact} from '../../../hooks/useGetContact';
import {useUpdateContact} from '../../../hooks/useUpdateContact';
import {Text} from 'react-native-paper';
import styles from '../../create/createContact-styles';
import {
  checkOrRequestCameraPermission,
  checkOrRequestGalleryPermissions,
} from '../../../commun/permisions/checkOrOpen';
import {Pressable} from 'react-native'; // Import Pressable

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

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
      contact.imageUri ? setImageUri(contact.imageUri) : null;
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

        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? 'lightblue' : 'blue'},
          ]}
          onPress={() => checkOrRequestCameraPermission(setImageUri)}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? 'lightblue' : 'blue'},
          ]}
          onPress={() => checkOrRequestGalleryPermissions(setImageUri)}>
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.button,
            {backgroundColor: pressed ? 'lightblue' : 'blue'},
          ]}
          onPress={handleSubmit}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Updating...' : 'Update Contact'}
          </Text>
        </Pressable>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

export default UpdateForm;
