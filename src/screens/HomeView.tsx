import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {useContacts} from '../hooks/useContact';
import ContactItem from '../components/ContactItem';
import styles from './HomeView.style';
import CreateContact from '../components/createContactButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACTS_KEY} from '../services/createContact';

const Home: React.FC = () => {
  const {contacts, loading} = useContacts();
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null,
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const fetchContacts = async () => {
    const manyContacts = await AsyncStorage.getItem(CONTACTS_KEY);
    console.log('you can see here;', manyContacts);
  };

  fetchContacts();

  const handleContactPress = (id: number) => {
    setSelectedContactId(prevId => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id!.toString()}
        renderItem={({item}) => (
          <ContactItem
            contact={item}
            isSelected={selectedContactId === item.id}
            onPress={() => handleContactPress(item.id!)}
          />
        )}
      />
      <CreateContact />
    </View>
  );
};

export default Home;
