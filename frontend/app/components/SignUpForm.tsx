import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signUp } from '../services/auth';
import { SignUpFormValues } from '../types/types';

const SignUpForm = ({navigation}: {navigation: any}) => {
  const [formValues, setFormValues] = useState<SignUpFormValues>({ username: '', password: '', email: '', roles: ['user'] });

  const handleInputChange = (name: keyof SignUpFormValues, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSignUp = async () => {
    await signUp(formValues);
    navigation.navigate('Sign In');
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
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={formValues.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
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

export default SignUpForm;
