export interface User {
    id: string | undefined;
    username: string;
    isUsernameSet: boolean;
    kindeId: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    createdAt: Date;
    followers: number;
    following: number;
    posts: number;
    profilepic: String;
}

export interface Follower {
    follower: {
        id: string,
        username: string,
        profilepic: string,
        bio: string,
    }
}

export interface Following {
    following: {
        id: string,
        username: string,
        profilepic: string,
        bio: string,
    }
}

export interface Post {
    id: string,
    content: string,
    createdAt: Date,
    userId: string,
    username: string
}