"use client"

import React, { useEffect, useState } from 'react';
import { setNewPost, getUsername, getUserData, getUsersPosts } from '../server/actions'; // Ensure this is correctly imported
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { PrismaClient } from '@prisma/client';
import Loading from './Loading';
import {formatDate} from '../server/FormatDate';

interface Post {
    id: string,
    content: string,
    createdAt: Date,
    userId: string,
    username: string
}


const PostsOwnProfile = () => {
    const { user } = useKindeBrowserClient();

    const [Username, setUsername] = useState("default");
    const [Posts, setPosts] = useState<Post[]>([]);
    const [loadingUsername, setLoadingUsername] = useState(true)
    const [loadingUsersPosts, setLoadingUsersPosts] = useState(true)

    useEffect(() => {
        if (!user?.id) return;

        const username = async () => {
            try {
                const {Username_call} = await getUsername(user.id)
                setUsername(Username_call || "default")
                setLoadingUsername(false)
                console.log("setted username")
            }
        
            catch{
                throw "getusername error"
            }
        }

        username()
    }, [user])

    console.log(Username)

    useEffect(() => {

        if(!Username) return

        const getUsersPostsFE = async () =>{
            const {UsersPosts} = await getUsersPosts(Username)
            setPosts(UsersPosts)
            setLoadingUsersPosts(false)
        }
        getUsersPostsFE()
    }, [Username])

    const [content, setContent] = useState(''); // Local state to track input

    const handleSetContent = async () => {
        if (!content.trim()) {
            alert("Post can't be empty!"); // Simple validation
            return;
        }
        try {
            await setNewPost(content, user?.id || "err", Username); // Call the action with the username
            const newPost = {
                id: "new-post-id", // You can replace this with the actual ID after the post is created
                content: content,
                createdAt: new Date(),
                userId: user?.id || "err",
                username: Username || "unidentified", // Assuming User contains the username
            };
            setPosts((prevPosts) => [newPost, ...prevPosts])
            setContent("")
        } catch (error) {
            console.error("Error setting username:", error);
            alert("Failed to set username. Please try again.");
        }
    };

    if (loadingUsername) return <Loading />
    if (loadingUsersPosts) return <Loading />

    return (
        <>
            <div className='container-fluid pt-5'>
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
                                        <a className='h6 fw-bold text-decoration-none' href={"/profile/"+post.username}>{post.username}</a>
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

export default PostsOwnProfile