import React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Header from './src/components/Header';
import CreateContactForm from './src/screens/create/createContactView';
import ContactPage from './src/screens/SingleContact/singleContactPage';
import Home from './src/screens/home/HomeView';
import UpdateContactPage from './src/screens/SingleContact/updateContact/updateContact';
import LoginView from './src/screens/auth/LoginView';
import RegisterView from './src/screens/auth/RegisterView';

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  CreateContact: undefined;
  ContactPage: {contactId: number};
  UpdateContactPage: {contactId: number};
  MapPage: undefined;
  login: undefined;
  register: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Header />
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" component={LoginView} />
          <Stack.Screen name="register" component={RegisterView} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CreateContact" component={CreateContactForm} />
          <Stack.Screen name="ContactPage" component={ContactPage} />
          <Stack.Screen
            name="UpdateContactPage"
            component={UpdateContactPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
