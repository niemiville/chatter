import axios from 'axios';

axios.defaults.baseURL = "http:/10.0.2.2:8080/api";

export const signIn = (credentials: {username: string, password: string}):Promise<any> => {
    return axios.post("/auth/signin", credentials, {"headers": {"Content-Type": "application/json"}})
    .then(res => res.data)
    .catch(err => console.log(err.response.data));
};

export const signUp = (credentials: {username: string, email: string, password: string, roles: [string]}):Promise<any> => {
    return axios.post("/auth/signup", credentials, {"headers": {"Content-Type": "application/json"}})
    .then(res => res.data)
    .catch(err => console.log(err.response.data));
};
