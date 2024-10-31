import {StyleSheet} from 'react-native';

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  coordinateContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  userMarker: {
    width: 25,
    height: 25,
    backgroundColor: 'blue',
    borderRadius: 12.5,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default mapStyles;
