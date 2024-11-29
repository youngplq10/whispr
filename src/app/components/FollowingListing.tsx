"use client"

import { useParams } from 'next/navigation';
import React, {  useEffect, useState } from 'react'
import { getFollowing, getUserDataByUsername } from '@/app/server/actions';
import Loading from '@/app/components/Loading';
import Image from 'next/image';

interface User {
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
    profilepic: String,
}

interface Following {
    following: {
        id: string,
        username: string,
        profilepic: string,
        bio: string,
    }
}

const FollowingListing = () => {
    const params = useParams();
    const profileusername = params.profilename;

    const [User, setUser] = useState<User | null>(null);
    const [followingListing, setFollowingListing] = useState<Following[]>([]);
    const [loadingFollowingListing, setLoadingFollowingListing] = useState(true);

    useEffect(() => {
        const getUserDataFE = async () => {
            const { User } = await getUserDataByUsername(profileusername.toString());
            setUser(User);
            console.log(User);
        }

        getUserDataFE();
    }, [profileusername]);

    useEffect(() => {
        if (!User) return;

        const getFollowingFE = async () => {
            const { following } = await getFollowing(User.id);
            setFollowingListing(following);
            setLoadingFollowingListing(false);
        }

        getFollowingFE();
    }, [User]);

    if (loadingFollowingListing) return <Loading />;

    return(
        <>  
            <div className='container-fluid my-5'>
                {followingListing.map((follow, index) => {
                    return(
                        <div className='row justify-content-center' key={index}>
                            <div className='col-11 col-md-6 col-xl-4 my-2 border py-4'>
                                <Image 
                                    width={50}
                                    height={50}
                                    alt='prof-pic'
                                    src={follow.following.profilepic}
                                />
                                <a className='text-decoration-none text-dark ms-2' href={"/profile/"+follow.following.username}>{follow.following.username}</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default FollowingListing;