import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
    borderRadius: 10, // Optional: Add border radius for rounded corners
    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow blur radius
    // Android elevation property
    elevation: 5, // Elevation for Android shadow
  },
  containerImage: {
    width: 300,
    height: 200,
    alignItems: 'center', // Center image inside this container
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  imageOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default styles;
