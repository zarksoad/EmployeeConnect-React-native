import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import CreateContactForm from './src/screens/create/createContactView';
import ContactPage from './src/screens/SingleContact/singleContactPage';
import Home from './src/screens/home/HomeView';
import UpdateContactPage from './src/screens/SingleContact/updateContact/updateContact';
import LoginView from './src/screens/auth/LoginView';
import RegisterView from './src/screens/auth/RegisterView';
import {ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  CreateContact: undefined;
  ContactPage: {contactId: number};
  UpdateContactPage: {contactId: number};
  login: undefined;
  register: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setIsLoggedIn(!!token); // Set logged in status based on token presence
      } catch (error) {
        console.error('Error fetching token:', error);
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <Header />
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'login'}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateContact"
            component={CreateContactForm}
            options={{title: 'Create Contact'}}
          />
          <Stack.Screen
            name="ContactPage"
            component={ContactPage}
            options={{title: 'Contact Details'}}
          />
          <Stack.Screen
            name="UpdateContactPage"
            component={UpdateContactPage}
            options={{title: 'Update Contact'}}
          />

          {!isLoggedIn && (
            <>
              <Stack.Screen
                name="login"
                component={LoginView}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="register"
                component={RegisterView}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
