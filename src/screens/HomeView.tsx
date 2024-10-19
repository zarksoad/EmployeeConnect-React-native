import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useContacts} from '../hooks/useContact';
import styles from './HomeView.style';

const Home = () => {
  const {contacts, loading} = useContacts();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
