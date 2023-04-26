import axios from 'axios';
import { retrieveData } from '../storage/async-storage';

axios.defaults.baseURL = "http:/10.0.2.2:8080/api";

export const getMessages = async (receiverId: number):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": user.id, 
            "receiverId": receiverId
        }
    };
    return axios.get("/message", config)
    .then(messages => messages.data.messages)
    .catch(err => console.log(err));
};

export const sendMessage = async (receiverId: number, data: string):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id, 
            "receiverId": receiverId
        }
    };
    return axios.post("/message", {"body": data}, config)
    .then(res => res)
    .catch(err => console.log(err));
};

