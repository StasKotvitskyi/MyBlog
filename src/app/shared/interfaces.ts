export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean
}

export interface FirebaseAuthResponse {
    idToken: string;
    expiresIn: string
}

export interface Post {
    title: string;
    text: string;
    author: string;
    date: Date;
    id?: string
}

export interface FbCreateResponse {
    name: string
}
