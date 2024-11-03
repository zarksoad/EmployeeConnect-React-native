import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactCard: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 10,
    backgroundColor: '#e0f7fa',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  contactInfo: {
    width: '80%', // Use 80% of the card width
    alignItems: 'flex-start', // Align to the left
    marginTop: 16,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  locationLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  iconButton: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    padding: 20,
  },
  trashIcon: {
    backgroundColor: '#e57373',
  },
  updateIcon: {
    backgroundColor: '#81c784',
  },
});

export default styles;
