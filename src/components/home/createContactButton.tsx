import {Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

type NavigationCreateContactProps = NativeStackNavigationProp<
  RootStackParamList,
  'CreateContact'
>;

const CreateContact: React.FC = ({}) => {
  const navigation = useNavigation<NavigationCreateContactProps>();

  const createNewContact = () => {
    navigation.navigate('CreateContact');
  };
  return <Button title="new contact" onPress={createNewContact} />;
};

export default CreateContact;
