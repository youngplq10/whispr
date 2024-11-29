"use client"

import Image from 'next/image';
import { getUserData } from '@/app/server/actions';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import React, {useState, useEffect} from 'react';
import Loading from '@/app/components/Loading';
import {formatDateWithoutHours} from '@/app/server/FormatDate';
import { User } from '../interfaces/interfaces';

const ProfileInfo = () => {
    const { user } = useKindeBrowserClient();

    const [User, setUser] = useState<User>();
    const [loadingUser, setLoadingUser] = useState(true);

    const [howManyFollowers, setHowManyFollowers] = useState(0);
    const [howManyFollowing, setHowManyFollowing] = useState(0);

    useEffect(() => {
        if (!user?.id) return;
    
        const getUserDataFE = async () => {
            try {
                const { User } = await getUserData(user.id);
                if(!User) return;
                setUser(User);
                setHowManyFollowers(User.followers || 0)
                setHowManyFollowing(User.following || 0)
                setLoadingUser(false);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
    
        getUserDataFE();
    }, [user]);

    if(loadingUser) return <Loading />;

    return(
        <>
            <div className='container-fluid'>
                <div className=''>
                    <div className='row justify-content-center mt-3'>
                        <div className='col-11 col-md-8 col-xl-6 px-3 py-3 border-top border-start border-end'>
                        <Image 
                            src={User?.profilepic.toString() || "https://lh3.googleusercontent.com/a/ACg8ocIximtuKu7QUkx_E5R9WctexXezRz5DLWX_3KRXJhQ3lebAGTLM=s96-c"}
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
                            <span>Joined: {User?.createdAt ? formatDateWithoutHours(User.createdAt.toString()) : "N/A"}</span>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-11 col-md-8 col-xl-6 px-3 pb-2 border-start border-end'>
                            <span>{User?.bio}</span>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-11 col-md-8 col-xl-6 border-bottom border-start border-end pb-3'>
                            <a className="fs-6 ms-2 text-decoration-none text-dark" href={"/profile/"+User?.username+"/followers"}>{howManyFollowing} followers</a>
                            <a className="fs-6 ms-2 text-decoration-none text-dark" href={"/profile/"+User?.username+"/following"}>{howManyFollowers} following</a>
                            <a className='btn btn-outline-primary ms-2' href='/edit/profile'>Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;