import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getContacts, getOpenContactRequests, acceptContactRequest, rejectContactRequest, blockContactRequest } from '../services/contact';
import { ContactNames } from '../types/types';

export const Contacts = ({navigation}: {navigation: any}) => {
    const [contacts, setContacts] = useState<[ContactNames] | null>(null);
    const [contactRequests, setContactRequests] = useState<[ContactNames] | null>(null);

    useEffect(() => {
        getContacts().then(contacts => setContacts(contacts));
        getOpenContactRequests().then(requests => setContactRequests(requests));
    }, []);

    return (
        <SafeAreaView style={{flexDirection: "column"}}>
            <ScrollView>
                {contacts != null && 
                    <View style={{padding: 15}}>
                        {contacts.map(c =>
                            <Text style={{padding: 5, fontSize: 20}} key={c.id} onPress={() => navigation.navigate('Chat', { id: c.id, username: c.username })}>{c.username}</Text>         
                        )}
                    </View>
                }
                <Text style={{paddingLeft: 15, fontSize: 23, color: "black"}}>Open contact requests</Text>
                {contactRequests != null && 
                    <View style={{padding: 15}}>
                        {contactRequests.map(c =>
                            <View key={c.id} style={{flexDirection: "row"}}>
                                <Text style={{padding: 5, fontSize: 20}} key={c.id + "name"}>{c.username}</Text> 
                                <Text style={{padding: 5, fontSize: 20, color: "green"}} onPress={() => acceptContactRequest(c.id)}> Accept </Text>
                                <Text style={{padding: 5, fontSize: 20, color: "orange"}} onPress={() => rejectContactRequest(c.id)}> Reject </Text>
                                <Text style={{padding: 5, fontSize: 20, color: "red"}} onPress={() => blockContactRequest(c.id)}> Block </Text>
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