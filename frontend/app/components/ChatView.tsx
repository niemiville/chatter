import React, { useEffect, useState } from 'react';
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
    var msg = "Not ready";
    if(messages != null) {
        msg = messages[0].body
    }
    useEffect(() => {
        console.log("useeffect chatview")
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
            {msg}
        </>
    )

}