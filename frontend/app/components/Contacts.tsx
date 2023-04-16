import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getContacts } from '../services/requests';

interface ContactNames {
    id: number;
    username: string;
}

export const Contacts = ({navigation}: {navigation: any}) => {
    const [contacts, setContacts] = useState<[ContactNames] | null>(null);
    const senderId = 1;
    const receiverId = 2;

    useEffect(() => {
        getContacts(senderId, receiverId).then(contacts => setContacts(contacts))
    }, []);

    return (
        <SafeAreaView style={{flexDirection: "column"}}>
            <ScrollView>
                {contacts != null && 
                    <View style={{padding: 15}}>
                        {contacts.map(c =>
                            <Text key={c.id} onPress={() => navigation.navigate('Chat', { id: c.id, username: c.username })}>{c.username}</Text>         
                        )}
                    </View>
                }
                <View>
                    <Button title="Add contact" onPress={() => navigation.navigate('Add Contact')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}