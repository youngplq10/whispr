"use client"

import React, { useEffect, useState } from 'react';
import { setNewPost, getAllPosts, getUserData } from '@/app/server/actions';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Loading from '@/app/components/Loading';
import { formatDate } from '@/app/server/FormatDate';
import { Post } from '../interfaces/interfaces';

const FormNewPost = () => {
    const { user } = useKindeBrowserClient();

    const [User, setUser] = useState("a");
    const [loadingUser, setLoadingUser] = useState(true);

    const [skip, setSkip] = useState(0)
    const [take, setTake] = useState(10)

    const [reachedBottom, setReachedBottom] = useState(false)

    useEffect(() => {
        if (!user?.id) return;
    
        const getUserDataFE = async () => {
            try {
                const { User } = await getUserData(user.id);
                setUser(User?.username || "unidentified");
                setLoadingUser(false);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
    
        getUserDataFE();
    }, [user]);
    
    const [content, setContent] = useState('');

    const handleSetContent = async () => {
        if (!content.trim()) {
            alert("Post can't be empty!");
            return;
        }
        try {
            await setNewPost(content, user?.id || "err", User);
            const newPost = {
                id: "new-post-id",
                content: content,
                createdAt: new Date(),
                userId: user?.id || "err",
                username: User || "unidentified",
            };
            setPosts((prevPosts) => [newPost, ...prevPosts]);
            setContent("");
        } catch (error) {
            alert("Failed to create new post. Please try again.");
        }
    };

    const [Posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading) {
            const getAllPostsFE = async () => {
                const {AllPosts} = await getAllPosts(skip, take);
                setPosts(AllPosts);
                setLoading(false);
            }
            getAllPostsFE();
        }

        if(reachedBottom===true) {
            const getAllPostsFE = async () => {
                console.log("took: "+ take)
                const {AllPosts} = await getAllPosts(skip, take);
                setReachedBottom(false);
                setPosts(AllPosts);
            }
            getAllPostsFE();
        }
    }, [reachedBottom]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const viewportHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrollTop + viewportHeight >= fullHeight - 5 && reachedBottom===false) {
                setTake((prev) => prev+10)
                setReachedBottom(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [reachedBottom]);

    if(loadingUser) return <Loading />;

    if (loading) return <Loading />;

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
                            onChange={(e) => setContent(e.target.value)}
                        /> 
                        <button 
                            className='btn btn-primary py-1 px-3 mt-2' 
                            onClick={handleSetContent}
                        >Share</button>            
                    </div>
                </div>
                

                {Posts.map((post, index) => {
                    return(
                        <div key={index}>
                            <div className='row justify-content-center mt-5 mb-5'>
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

export default FormNewPost;