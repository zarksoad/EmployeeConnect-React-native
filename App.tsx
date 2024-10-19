import {StyleSheet, Text, useColorScheme, View} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.whiteText : styles.darkText}>
        Hello world
      </Text>
      <Text>Ayuda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  whiteText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  darkText: {
    color: '#000000',
    fontSize: 30,
  },
});

export default App;
