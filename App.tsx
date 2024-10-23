import React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from './src/components/Header';
import SplashScreen from './src/components/SplashScreen';
import Home from './src/screens/HomeView';
import CreateContactForm from './src/components/createContactForm';
import ContactPage from './src/screens/singleContactPage';

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Splash: undefined;
  CreateContact: undefined;
  SingleContact: undefined;
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateContact" component={CreateContactForm} />
        <Stack.Screen name="ContactPage" component={ContactPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
