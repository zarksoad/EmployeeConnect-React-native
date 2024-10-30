import React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from './src/components/Header';
import SplashScreen from './src/components/SplashScreen';
import CreateContactForm from './src/screens/create/createContactView';
import ContactPage from './src/screens/SingleContact/singleContactPage';
import Home from './src/screens/home/HomeView';
import UpdateContactPage from './src/screens/SingleContact/updateContact/updateContact';
import MapPage from './src/components/maps/Map';

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Splash: undefined;
  CreateContact: undefined;
  ContactPage: {contactId: number};
  UpdateContactPage: {contactId: number};
  MapPage: undefined;
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
        <Stack.Screen name="UpdateContactPage" component={UpdateContactPage} />
        <Stack.Screen name="MapPage" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
