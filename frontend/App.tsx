/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ChatView } from './app/components/ChatView';
import SignInForm from './app/components/SignInForm';
import HomeScreen from './app/components/HomeScreen';

const Stack = createNativeStackNavigator();

//See this: https://wix.github.io/react-native-navigation/docs/basic-navigation
function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sign In" component={SignInForm} />
        <Stack.Screen name="Chat" component={ChatView} />
      </Stack.Navigator>            
    </NavigationContainer>
  );
}

export default App;
