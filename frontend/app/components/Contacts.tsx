import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getContacts, getOpenContactRequests, acceptContactRequest, rejectContactRequest, blockContactRequest } from '../services/requests';

interface ContactNames {
    id: number;
    username: string;
}

export const Contacts = ({navigation}: {navigation: any}) => {
    const [contacts, setContacts] = useState<[ContactNames] | null>(null);
    const [contactRequests, setContactRequests] = useState<[ContactNames] | null>(null);
    const senderId = 1;
    const receiverId = 2;

    useEffect(() => {
        getContacts(senderId, receiverId).then(contacts => setContacts(contacts));
        getOpenContactRequests(senderId).then(requests => setContactRequests(requests));
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
                <Text style={{paddingLeft: 15}}>Open contact requests</Text>
                {contactRequests != null && 
                    <View style={{padding: 15}}>
                        {contactRequests.map(c =>
                            <View style={{flexDirection: "row"}}>
                                <Text key={c.id}>{c.username}</Text> 
                                <Text onPress={() => acceptContactRequest(senderId, c.id)}> Accept </Text>
                                <Text onPress={() => rejectContactRequest(senderId, c.id)}> Reject </Text>
                                <Text onPress={() => blockContactRequest(senderId, c.id)}> Block </Text>
                            </View>  
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