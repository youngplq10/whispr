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
    posts: number,
    profilepic: String
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
    console.log(user?.picture)

    return(
        
        <>
            <div className='container-fluid'>
                <div className=''>
                    <div className='row justify-content-center mt-3'>
                        <div className='col-11 col-md-8 col-xl-6 px-3 py-3 border-top border-start border-end'>
                        <Image 
                            src={User.profilepic.toString() || "https://lh3.googleusercontent.com/a/ACg8ocIximtuKu7QUkx_E5R9WctexXezRz5DLWX_3KRXJhQ3lebAGTLM=s96-c"}
                            alt="Whispr"
                            width={50}
                            height={50}
                            className='text-center rounded'
                        />
                        <span className='text-center ms-2 fs-6 fw-bold'>{User?.username}</span>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-11 col-md-8 col-xl-6 px-3 pb-2 border-start border-end'>
                            <span>Dołaczył: {User?.createdAt ? formatDateWithoutHours(User.createdAt.toString()) : "N/A"}</span>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-11 col-md-8 col-xl-6 border-bottom border-start border-end pb-3'>
                            <span className='fs-6 ms-1'>{User?.followers} obserwujących</span>
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