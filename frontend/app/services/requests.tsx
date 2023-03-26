import axios from 'axios';

const config = {
    headers:{
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc5ODE4MDM1LCJleHAiOjE2Nzk5MDQ0MzV9.Ryg4ts-TaBCdNGzaWjrDBVUeENNMy8z78RQClDu9AVg"
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


export { getMessages };