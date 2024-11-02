// In map.style.js
import {StyleSheet} from 'react-native';

const mapStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
  },
  coordinateContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  userMarker: {
    height: 30,
    width: 30,
    backgroundColor: 'blue',
    borderRadius: 15,
  },
  marker: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default mapStyles;
