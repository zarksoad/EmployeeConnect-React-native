import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
    marginVertical: 4,
  },
  contactInfo: {
    fontSize: 18,
    marginVertical: 2,
  },
  button: {
    marginTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  deleteButton: {
    backgroundColor: '#ff4757',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: 'green',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
});

export default styles;
