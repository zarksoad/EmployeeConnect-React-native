import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  SectionList,
  SectionListData,
} from 'react-native';
import {Text, Divider} from '@ui-kitten/components';
import styles from './HomeView.style';
import {useContacts} from '../../hooks/useGetContacts';
import ContactItem from '../../components/home/ContactItem';
import {Contact} from '../../services/types/contactType';
import PlusButton from '../../components/home/createContactButton';

interface ContactSection extends SectionListData<Contact> {
  title: string;
}

const groupContactsByInitial = (contacts: Contact[]): ContactSection[] => {
  const groupedContacts: {[key: string]: Contact[]} = {};

  contacts.forEach(contact => {
    const initial = contact.name.charAt(0).toUpperCase();
    if (!groupedContacts[initial]) {
      groupedContacts[initial] = [];
    }
    groupedContacts[initial].push(contact);
  });

  return Object.keys(groupedContacts)
    .sort()
    .map(initial => ({
      title: initial,
      data: groupedContacts[initial],
    }));
};

const Home: React.FC = () => {
  const {contacts, loading} = useContacts();
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null,
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Log contacts to check their structure
  console.log('Contacts:', contacts);

  const handleContactPress = (id: number) => {
    setSelectedContactId(prevId => (prevId === id ? null : id));
  };

  const groupedContacts = groupContactsByInitial(contacts);

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupedContacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ContactItem
            contact={item}
            onPress={() => handleContactPress(item.id)}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text
            category="h6"
            style={{paddingVertical: 8, paddingHorizontal: 16}}>
            {title}
          </Text>
        )}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 4}} />}
      />
      <PlusButton />
    </View>
  );
};

export default Home;
