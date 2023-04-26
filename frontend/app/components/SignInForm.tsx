import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signIn } from '../services/auth';
import { storeData } from '../storage/async-storage';
import { SignInFormValues } from '../types/types';

const SignInForm = ({navigation}: {navigation: any}) => {
  const [formValues, setFormValues] = useState<SignInFormValues>({ username: '', password: '' });

  const handleInputChange = (name: keyof SignInFormValues, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSignIn = async () => {
    const user = await signIn(formValues);
    storeData("user", user);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={formValues.username}
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={formValues.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry={true}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 18,
  },
});

export default SignInForm;
