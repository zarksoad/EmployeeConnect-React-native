import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  containerImage: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 16,
  },
  imageOptionsContainer: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    width: '100%', // Ensures the form fields take up full width
    paddingHorizontal: 20, // Adds padding to improve readability
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'blue',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#007AFF', // A more vibrant blue for better visibility
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, // Larger font size for better readability
    fontWeight: 'bold', // Bold text to stand out on the button
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default styles;
