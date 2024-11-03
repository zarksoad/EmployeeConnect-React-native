import {StyleService} from '@ui-kitten/components';

const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contactItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center', // Use alignItems to vertically center
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, // Add margin to separate the image from text
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3366FF', // Changed to hex for consistency with Kitten
  },
  contactPhone: {
    fontSize: 16,
    color: '#3366FF', // Same as contact name for uniformity
  },
  contactEmail: {
    fontSize: 16,
    color: '#3366FF',
  },
});

export default styles;
