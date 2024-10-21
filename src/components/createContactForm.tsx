import {useState} from 'react';
import {useCreateContact} from '../hooks/useCreateContact';
import {Alert, View, Button, Text, TextInput} from 'react-native';

const CreateContactForm: React.FC = () => {
  const {createContact, isLoading, error} = useCreateContact();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async () => {
    await createContact({name, phone, email});
    if (!error) {
      Alert.alert('Success', 'Contact added successfully');
      setName('');
      setPhone('');
      setEmail('');
    } else {
      Alert.alert('Error', error || 'failed to create contact');
    }
  };
  return (
    <View>
      <TextInput placeholder="name" value={name} onChangeText={setName} />
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="phone" value={phone} onChangeText={setPhone} />
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
