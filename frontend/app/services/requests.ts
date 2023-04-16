import axios from 'axios';
import { retrieveData } from '../storage/async-storage';
import { Contact } from '../types/types';

const getMessages = async (senderId: number, receiverId: number):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": senderId, 
            "receiverId": receiverId
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
            "senderId": senderId, 
            "receiverId": receiverId
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

const getContacts = async (senderId: number, receiverId: number):Promise<any> => {
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
    return axios.get("http:/10.0.2.2:8080/api/contacts", config)
    .then(res => getContactNames(getUniqueIds(res.data.contacts)))
    .catch(err => console.log(err.response.data));
};

const getOpenContactRequests = async (senderId: number):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": senderId
        }
    };
    return axios.get("http:/10.0.2.2:8080/api/contact-request", config)
    .then(res => getContactNames(getUniqueIds(res.data.contactRequests)))
    .catch(err => console.log(err.response.data));
};

const getUniqueIds = (contacts: Array<Contact>) => {
    let ids:number[] = [];
    for(let c of contacts){
        if(!ids.includes(c.senderId)) ids.push(c.senderId);
        if(!ids.includes(c.receiverId)) ids.push(c.receiverId);
    }
    console.log("Contact ids: ", ids);
    return ids;
}

const getContactNames = async (idList: Array<number>):Promise<any> => {
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
    return axios.post("http:/10.0.2.2:8080/api/get-usernames", {"idList": idList}, config)
    .then(res => res.data.usernames)
    .catch(err => console.log(err.response.data));
};

const sendContactRequest = async (senderId: number, receiverId: number):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": senderId
        }
    };
    return axios.post("http:/10.0.2.2:8080/api/contact-request", {"senderId": senderId, "receiverId": receiverId}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};

const acceptContactRequest = async (senderId: number, receiverId: number):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": senderId
        }
    };
    return axios.put("http:/10.0.2.2:8080/api/contact-request", {"senderId": senderId, "receiverId": receiverId, "status": "accepted"}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};

const rejectContactRequest = async (senderId: number, receiverId: number):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": senderId
        }
    };
    return axios.put("http:/10.0.2.2:8080/api/contact-request", {"senderId": senderId, "receiverId": receiverId, "status": "rejected"}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};

const blockContactRequest = async (senderId: number, receiverId: number):Promise<any> => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": senderId
        }
    };
    return axios.put("http:/10.0.2.2:8080/api/contact-request", {"senderId": senderId, "receiverId": receiverId, "status": "blocked"}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};

export { getMessages, sendMessage, signIn, getContacts, sendContactRequest, getOpenContactRequests, acceptContactRequest, rejectContactRequest, blockContactRequest };