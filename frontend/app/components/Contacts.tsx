import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getContacts } from '../services/requests';

interface ContactNames {
    id: number;
    username: string;
}

export const Contacts = () => {
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
                            <Text key={c.id}>{c.username}</Text>         
                        )}
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )

}