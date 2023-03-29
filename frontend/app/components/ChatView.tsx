import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { getMessages } from '../services/requests';

interface Message{
    id: number;
    senderId: number;
    receiverId: number;
    body: string;
    createdAt: string;
    updatedAt: string;
 }

export const ChatView = () => {
    const [messages, setMessages] = useState<[Message] | null>(null);
    const senderId = 1;
    const receiverId = 2;

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

    return (
        <>
            {messages != null && 
                <View
                style={{
                  flexDirection: 'column',
                  height: 100,
                  padding: 0,
                }}>
                    {messages.map(m =>
                        <Text key={m.id}>
                            {m.body}
                        </Text>
                          
                    )}
                </View>
            }
        </>
    )

}
