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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default mapStyles;
