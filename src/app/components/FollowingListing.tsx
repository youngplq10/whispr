"use client"

import { useParams } from 'next/navigation';
import React, {  useEffect, useState } from 'react'
import { getFollowing, getUserDataByUsername } from '@/app/server/actions';
import Loading from '@/app/components/Loading';

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
    id: string,
    username: string,
    profilepic: string,
    bio: string,
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
            <div className='container-fluid'>
                {followingListing.map((follow, index) => {
                    return(
                        <div className='row' key={index}>
                            <div className='col-12'>
                                <span>
                                    {follow.username}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default FollowingListing;