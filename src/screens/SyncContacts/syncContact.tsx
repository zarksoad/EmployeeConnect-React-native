import React, { useEffect, useState } from 'react';
import {
  View,
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
import {
  transformContacts,
  uploadContacts,
} from '../../services/CreateArrayContactService';

const ContactUploader: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const requestPermissionAndFetchContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Access Contacts Permission',
          message: 'This app needs access to your contacts to upload them.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const rawContacts = await Contacts.getAll();
        const transformedContacts = transformContacts(rawContacts);
        setContacts(transformedContacts);
      } else {
        Alert.alert('Permission Denied', 'Cannot access contacts.');
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const filterValidContacts = () => {
    // Now we just check if the contact has a valid name
    const validContacts = contacts
      .map(contact => ({
        ...contact,
        name: contact.name || 'Unnamed Contact',
      }))
      .filter(contact => contact.name); // Remove invalid contacts
    setFilteredContacts(validContacts);
  };

  const handleUploadContacts = () => {
    setModalVisible(true); // Always show the modal when the button is clicked
  };

  const handleConfirmUpload = async () => {
    if (filteredContacts.length > 0) {
      setIsUploading(true);
      let progress = 0;

      try {
        for (let i = 0; i < filteredContacts.length; i++) {
          const contact = filteredContacts[i];
          await uploadContacts([contact]);
          progress = ((i + 1) / filteredContacts.length) * 100;
          setUploadProgress(progress);
        }

        setIsUploading(false);
        setModalVisible(false); 

        Alert.alert(
          'Synchronization Complete',
          'Synchronization is complete. Please log out and log back in to load the updated contacts.',
        );
      } catch (error) {
        setIsUploading(false);
        Alert.alert('Error', 'Failed to upload contacts.');
        console.error('Upload error:', error);
      }
    } else {
      Alert.alert('No Contacts', 'There are no valid contacts to upload.');
    }
  };

  const handleCancelUpload = () => {
    if (!isUploading) {
      setModalVisible(false);  
    } else {
      Alert.alert('Uploading', 'Please wait until the upload is finished.');
    }
  };

  useEffect(() => {
    requestPermissionAndFetchContacts();
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      filterValidContacts();
    }
  }, [contacts]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.uploadButton} 
        onPress={handleUploadContacts}>
        <Text style={styles.buttonText}>Upload Contacts</Text>
      </TouchableOpacity>

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={handleCancelUpload}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {isUploading
                  ? 'Uploading Contacts...'
                  : 'Valid Contacts to Upload'}
              </Text>

              {!isUploading ? (
                <ScrollView style={styles.contactList}>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact, index) => (
                      <Text key={index} style={styles.contactName}>
                        {contact.name}
                      </Text>
                    ))
                  ) : (
                    <Text>No valid contacts to upload</Text>
                  )}
                </ScrollView>
              ) : (
                <View style={styles.uploadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={styles.uploadProgressText}>
                    Uploading {Math.round(uploadProgress)}%
                  </Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {width: `${uploadProgress}%`},
                      ]}
                    />
                  </View>
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={handleCancelUpload}
                  disabled={isUploading}>
                  <Text style={{color: isUploading ? 'gray' : 'red'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirmUpload}
                  disabled={isUploading}>
                  <Text style={{color: isUploading ? 'gray' : 'green'}}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactList: {
    maxHeight: 300,
  },
  contactName: {
    marginVertical: 5,
    color: 'blue',
  },
  uploadingContainer: {
    alignItems: 'center',
  },
  uploadProgressText: {
    marginVertical: 10,
    fontSize: 16,
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0000ff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ContactUploader;
