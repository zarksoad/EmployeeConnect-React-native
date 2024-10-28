import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  input: {
    color: 'blue',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 15,
    alignSelf: 'center',
  },
});

export default styles;
