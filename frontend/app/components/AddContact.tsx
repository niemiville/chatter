import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { sendContactRequest } from '../services/contact';


export const AddContact = ({navigation}: {navigation: any}) => {
    const [receiverId, onChangeReceiverId] = useState('');

    const addContact = async (receiverId: string) => {
        console.log(await sendContactRequest(Number(receiverId))); 
        onChangeReceiverId('');
        navigation.navigate('Contacts');
    }

    return (
        <SafeAreaView style={{flexDirection: "column"}}>
            <ScrollView>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Write user id"
                        onChangeText={onChangeReceiverId}
                        value={receiverId}
                        onSubmitEditing={ () => addContact(receiverId) }
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