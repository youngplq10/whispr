"use client"

import { useParams } from 'next/navigation';
import React, {  useEffect, useState } from 'react'
import { getFollowing, getUserDataByUsername } from '@/app/server/actions';
import Loading from '@/app/components/Loading';
import Image from 'next/image';
import { User, Following } from '../interfaces/interfaces';

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
                                    className='rounded'
                                    src={follow.following.profilepic.toString() || "https://lh3.googleusercontent.com/a/ACg8ocIximtuKu7QUkx_E5R9WctexXezRz5DLWX_3KRXJhQ3lebAGTLM=s96-c"}
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