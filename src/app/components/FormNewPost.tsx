"use client"

import React, { useEffect, useState } from 'react';
import { setNewPost, getAllPosts, getUserData } from '../server/actions'; // Ensure this is correctly imported
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { PrismaClient } from '@prisma/client';
import Loading from './Loading';
import formatDate from './FormatDate';

interface Post {
    id: string,
    content: string,
    createdAt: Date,
    userId: string,
    username: string
}

interface User{
    id: string,
    username: string,
    isUsernameSet: boolean,
    kindeId: string,
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
    createdAt: Date
}


const FormNewPost = () => {
    const { user } = useKindeBrowserClient();
    const prisma = new PrismaClient()

    const [User, setUser] = useState("a")
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        if (!user?.id) return; // Wait until user.id is available
    
        const getUserDataFE = async () => {
            try {
                const { User } = await getUserData(user.id);
                setUser(User?.username || "unidentified")
                setLoadingUser(false)
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
    
        getUserDataFE();
    }, [user]);

    console.log(User)

    
    const [content, setContent] = useState(''); // Local state to track input

    const handleSetContent = async () => {
        if (!content.trim()) {
            alert("Post can't be empty!"); // Simple validation
            return;
        }
        try {
            await setNewPost(content, user?.id || "err", User); // Call the action with the username
            const newPost = {
                id: "new-post-id", // You can replace this with the actual ID after the post is created
                content: content,
                createdAt: new Date(),
                userId: user?.id || "err",
                username: User || "unidentified", // Assuming User contains the username
            };
            setPosts((prevPosts) => [newPost, ...prevPosts])
            setContent("")
        } catch (error) {
            console.error("Error setting username:", error);
            alert("Failed to set username. Please try again.");
        }
    };

    const [Posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllPostsFE = async () => {
            const {AllPosts} = await getAllPosts()
            setPosts(AllPosts)
            setLoading(false)
        }
        getAllPostsFE();
    }, []);

    if(loadingUser) return <Loading />

    if (loading) return <Loading />

    return (
        <>
            <div className='container-fluid pt-5 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-11 col-md-8 col-xl-6 justify-content-center'>
                        <label htmlFor='formnewpost' className='form-label'>What's on your mind?</label> <br/>
                        <input 
                            type='text' 
                            id='formnewpost' 
                            className='form-control' 
                            value={content}
                            onChange={(e) => setContent(e.target.value)} // Update state on input change
                        /> 
                        <button 
                            className='btn btn-primary py-1 px-3 mt-2' 
                            onClick={handleSetContent} // Call handler on click
                        >Share</button>            
                    </div>
                </div>
                

                {Posts.map((post, index) => {
                    return(
                        <div key={index}>
                            <div className='row justify-content-center mt-5'>
                                <div className='col-11 col-md-8 col-xl-6 justify-content-center border py-2'>
                                    <div className='d-flex justify-content-between'>
                                        <span className='h6 fw-bold'>{post.username}</span>
                                        <span className='text-muted'>{formatDate(post.createdAt.toString())}</span>
                                    </div>
                                    <div className='fw-light py-1'>
                                        {post.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    );
}

export default FormNewPost