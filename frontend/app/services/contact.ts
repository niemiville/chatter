import axios from 'axios';
import { retrieveData } from '../storage/async-storage';
import { Contact } from '../types/types';

axios.defaults.baseURL = "http:/10.0.2.2:8080/api";

export const getContacts = async ():Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id
        }
    };
    return axios.get("/contacts", config)
    .then(res => getContactNames(getUniqueIds(res.data.contacts, user.id)))
    .catch(err => console.log(err.response.data));
};

export const getOpenContactRequests = async ():Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": (await retrieveData('user')).accessToken
        },
        params: {
            "senderId": user.id
        }
    };
    return axios.get("/contact-request", config)
    .then(res => getContactNames(getUniqueIds(res.data.contactRequests, user.id)))
    .catch(err => console.log(err.response.data));
};


export const getUniqueIds = (contacts: Array<Contact>, selfId: number) => {
    let ids:number[] = [];
    for(let c of contacts){
        if(!ids.includes(c.senderId)) ids.push(c.senderId);
        if(!ids.includes(c.receiverId)) ids.push(c.receiverId);
    }
    ids = ids.filter(i => i != selfId); //Removes the user itself (no self messaging allowed)
    return ids;
};

export const getContactNames = async (idList: Array<number>):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id 
        }
    };
    return axios.post("/get-usernames", {"idList": idList}, config)
    .then(res => res.data.usernames)
    .catch(err => console.log(err.response.data));
};

export const getContactId = async (username: string):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id 
        }
    };
    return axios.post("/get-id", {"username": username}, config)
    .then(res => res.data.user)
    .catch(err => console.log(err.response.data));
};

export const sendContactRequest = async (username: string):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id
        }
    };
    const receiverId = (await getContactId(username)).id;
    return axios.post("/contact-request", {"senderId": user.id, "receiverId": receiverId}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};

export const acceptContactRequest = async (receiverId: number):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id
        }
    };
    return axios.put("/contact-request", {"senderId": user.id, "receiverId": receiverId, "status": "accepted"}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};

export const rejectContactRequest = async (receiverId: number):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id
        }
    };
    return axios.put("/contact-request", {"senderId": user.id, "receiverId": receiverId, "status": "rejected"}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};

export const blockContactRequest = async (receiverId: number):Promise<any> => {
    const user = (await retrieveData('user'));
    const config = {
        headers:{
            "Content-Type": "application/json",
            "x-access-token": user.accessToken
        },
        params: {
            "senderId": user.id
        }
    };
    return axios.put("/contact-request", {"senderId": user.id, "receiverId": receiverId, "status": "blocked"}, config)
    .then(res => res.data.message)
    .catch(err => console.log(err.response.data));
};
