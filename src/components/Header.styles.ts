import {StyleSheet} from 'react-native';

const stylesHeader = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  text: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    shadowColor: '1',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 2,
    color: '#000000',
  },
});

export default stylesHeader;
