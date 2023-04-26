export interface Contact {
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export interface ContactNames {
    id: number;
    username: string;
};

export interface User {
    id: number;
    username: string;
    email: string;
    roles: [string];
    accessToken: string;
};

export interface Message{
    id: number;
    senderId: number;
    receiverId: number;
    body: string;
    createdAt: string;
    updatedAt: string;
};

export interface SignInFormValues {
    username: string;
    password: string;
};

export interface SignUpFormValues {
    username: string;
    password: string;
    email: string;
    roles: [string];
};