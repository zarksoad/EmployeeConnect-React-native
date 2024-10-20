import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {useContacts} from '../hooks/useContact';
import ContactItem from '../components/ContactItem';
import styles from './HomeView.style';
import CreateContact from '../components/createContactButton';

const Home: React.FC = () => {
  const {contacts, loading} = useContacts();
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null,
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleContactPress = (id: number) => {
    if (selectedContactId === id) {
      setSelectedContactId(null);
    } else {
      setSelectedContactId(id);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ContactItem
            contact={item}
            isSelected={selectedContactId === item.id}
            onPress={handleContactPress}
          />
        )}
      />
      <CreateContact />
    </View>
  );
};

export default Home;
