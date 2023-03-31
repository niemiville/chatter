import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({navigation}: {navigation: any}) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
        <Button title="Sign In" onPress={() => navigation.navigate('Sign In')} />
        <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
      </View>
    );
}

export default HomeScreen;