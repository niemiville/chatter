import React, { useCallback } from 'react';
import { Button, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { clearAsyncStorage, retrieveData } from '../storage/async-storage';
import { useState } from 'react';
import { User } from '../types/types';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<User | null>(null);

  useFocusEffect(
    useCallback(() => {
      retrieveData('user').then(u => setUser(u));
      console.log("asd")
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Logged in as: {user != null ? user.username : 'null'}</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
      <Button title="Sign In" onPress={() => navigation.navigate('Sign In')} />
      <Button title="Sign Off" onPress={() => clearAsyncStorage().then(() => retrieveData('user').then(u => setUser(u)))} />
      <Button title="Contacts" onPress={() => navigation.navigate('Contacts')} />
      <Button title="Add Contact" onPress={() => navigation.navigate('Add Contact')} />
    </View>
  );
}

export default HomeScreen;