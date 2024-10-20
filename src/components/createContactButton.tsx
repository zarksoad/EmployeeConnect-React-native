import {Alert, Button} from 'react-native';

const CreateContact = () => {
  const createNewContact = () => {
    Alert.alert('the contact has been created');
  };
  return <Button title="new contact" onPress={createNewContact} />;
};

export default CreateContact;
