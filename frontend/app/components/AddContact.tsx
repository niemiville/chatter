import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { sendContactRequest } from '../services/contact';


export const AddContact = ({navigation}: {navigation: any}) => {
    const [username, onChangeUsername] = useState('');

    const addContact = async (username: string) => {
        console.log(await sendContactRequest(username)); 
        onChangeUsername('');
        navigation.navigate('Contacts');
    }

    return (
        <SafeAreaView style={{flexDirection: "column"}}>
            <ScrollView>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Write a username"
                        onChangeText={onChangeUsername}
                        value={username}
                        onSubmitEditing={ () => addContact(username) }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      justifyContent: "center"
    }
});