import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#007AFF',
    padding: 5, // Optional, for adding space between image and border
    marginBottom: 16,
  },
  imageOptionsContainer: {
    height: 30,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 15,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default styles;
