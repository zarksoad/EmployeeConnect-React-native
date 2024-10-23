import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import styles from './HomeView.style';
import {useContacts} from '../../hooks/useGetContacts';
import ContactItem from '../../components/home/ContactItem';
import CreateContact from '../../components/home/createContactButton';
const Home: React.FC = () => {
  const {contacts, loading} = useContacts();
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null,
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
            onPress={() => handleContactPress(item.id!)}
          />
        )}
      />
      <CreateContact />
    </View>
  );
};

export default Home;
