import axios from 'axios';
import { retrieveData } from '../storage/async-storage';

const getMessages = async (senderId: number, receiverId: number):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": 1, 
            "receiverId": 2
        }
    };
    return axios.get("http:/10.0.2.2:8080/api/message", config)
    .then(messages => messages.data.messages)
    .catch(err => console.log(err));
};

const sendMessage = async (senderId: number, receiverId: number, data: string):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": 1, 
            "receiverId": 2
        }
    };
    return axios.post("http:/10.0.2.2:8080/api/message", {"body": data}, config)
    .then(res => res)
    .catch(err => console.log(err));
};

const signIn = (credentials: {username: string, password: string}):Promise<any> => {
    console.log(credentials)
    return axios.post("http:/10.0.2.2:8080/api/auth/signin", credentials, {"headers": {"Content-Type": "application/json"}})
    .then(res => res.data)
    .catch(err => console.log(err.response.data));
};


export { getMessages, sendMessage, signIn };