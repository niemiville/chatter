import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getMessages, sendMessage } from '../services/requests';

interface Message{
    id: number;
    senderId: number;
    receiverId: number;
    body: string;
    createdAt: string;
    updatedAt: string;
}

export const ChatView = ({route}: {route: any}) => {
    const [messages, setMessages] = useState<[Message] | null>(null);
    const [text, onChangeText] = useState("");
    const senderId = 1;
    const receiverId = route.params.id;

    useEffect(() => {
        getMessages(senderId, receiverId).then(messages =>
        setMessages(messages)
        )
        const interval = setInterval(() => {
        getMessages(senderId, receiverId).then(messages =>
        setMessages(messages)
        )
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const sendUserMessage = async (text: string) => {
        console.log(await sendMessage(1, receiverId, text)); 
        onChangeText("")
    }
    
    return (
        <SafeAreaView style={{flexDirection: "column"}}>
            <ScrollView>
                {messages != null && 
                    <View style={{padding: 15}}>
                        {messages.map(m =>
                            <Text key={m.id} style={m.senderId == senderId ? styles.senderTextField : styles.receiverTextField}>{m.body}</Text>         
                        )}
                    </View>
                }
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Write a message"
                        onChangeText={onChangeText}
                        value={text}
                        onSubmitEditing={ () => sendUserMessage(text) }
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
    },
    senderTextField: { 
        padding: 5, 
        marginBottom: 5, 
        marginLeft: 50,
        borderRadius: 5,
        backgroundColor: "lightgreen",
        textAlign: "right"},
    receiverTextField: { 
        padding: 5, 
        marginBottom: 5, 
        marginRight: 50,
        borderRadius: 5,
        backgroundColor: "lightgrey",
        textAlign: "left"},
});