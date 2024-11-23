"use client"
import Image from 'next/image'
import Whisprlogo from "../assets/whisprlogo.png"
import { getUserData } from '../server/actions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React, {useState, useEffect} from 'react'
import Loading from './Loading'
import {formatDateWithoutHours} from './FormatDate'

interface User{
    id: string,
    username: string,
    isUsernameSet: boolean,
    kindeId: string,
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
    createdAt: Date,
    followers: number,
    following: number,
    posts: number
}

const ProfileInfo = () => {
    const { user } = useKindeBrowserClient();

    const [User, setUser] = useState<User>()
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        if (!user?.id) return; // Wait until user.id is available
    
        const getUserDataFE = async () => {
            try {
                const { User } = await getUserData(user.id);
                if(!User) return 
                setUser(User)
                setLoadingUser(false)
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
    
        getUserDataFE();
    }, [user]);

    if(loadingUser) return <Loading />
    console.log(User?.followers)
    return(
        
        <>
            <div className='container'>
                <div className=''>
                    <div className='row justify-content-center mt-3'>
                        <div className='col-6 col-xl-2 px-3 py-3 border-top border-start'>
                        <Image 
                            src={"https://lh3.googleusercontent.com/p/AF1QipOId9RqRznxochxBh_Fk2mKX9epXHYpZgWotgeB=s680-w680-h510"}
                            alt="Whispr"
                            width={50}
                            height={50}
                            className='text-center rounded'
                        />
                        <span className='text-center ms-2 fs-6 fw-bold'>{User?.username}</span>
                        </div>

                        <div className='col-3 col-xl-2 px-3 pt-4 pb-3 border-top border-end'>
                            <span>Dołaczył: {formatDateWithoutHours(User?.createdAt)}</span>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-9 col-xl-4 border-bottom border-start border-end pt-2 pb-3'>
                            <span className='fs-6 ms-2'>{User?.followers} obserwujących</span>
                            <span className='fs-6 ms-2'>{User?.following} obserwowanych</span>
                            <a className='btn btn-outline-primary ms-2'>Edytuj</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo