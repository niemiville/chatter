/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ChatView } from './app/components/ChatView';
import SignInForm from './app/components/SignInForm';
import HomeScreen from './app/components/HomeScreen';
import { Contacts } from './app/components/Contacts';
import { AddContact } from './app/components/AddContact';
import SignUpForm from './app/components/SignUpForm';

const Stack = createNativeStackNavigator();

//See this: https://wix.github.io/react-native-navigation/docs/basic-navigation
function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign Up" component={SignUpForm} />
        <Stack.Screen name="Sign In" component={SignInForm} />
        <Stack.Screen name="Chat" component={ChatView} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Add Contact" component={AddContact} />
      </Stack.Navigator>            
    </NavigationContainer>
  );
}

export default App;
