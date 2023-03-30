import axios from 'axios';

const config = {
    headers:{
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwMTY4NDI0LCJleHAiOjE2ODAyNTQ4MjR9.1L2EKVEHyw-4lTJQ9RtiqIp_CnBdWsele8kf4HIm8-Q"
    },
    params: {
        "senderId": 1, 
        "receiverId": 2
    }
};

const getMessages = (senderId: number, receiverId: number):Promise<any> => {
    return axios.get("http:/10.0.2.2:8080/api/message", config)
    .then(messages => messages.data.messages)
    .catch(err => console.log(err));
};

const sendMessage = (senderId: number, receiverId: number, data: string):Promise<any> => {
    return axios.post("http:/10.0.2.2:8080/api/message", {"body": data}, config)
    .then(res => res)
    .catch(err => console.log(err));
};


export { getMessages, sendMessage };