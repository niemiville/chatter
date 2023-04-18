export interface Contact {
    senderId: number;
    receiverId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    roles: [string];
    accessToken: string;
}