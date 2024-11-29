"use client"

import { useParams } from 'next/navigation';
import React, {  useEffect, useState } from 'react'
import { getFollowers,  getUserDataByUsername } from '@/app/server/actions';
import Loading from '@/app/components/Loading';
import Image from 'next/image';
import { User, Follower } from '../interfaces/interfaces';


const FollowersListing = () => {
    const params = useParams();
    const profileusername = params.profilename;

    const [User, setUser] = useState<User | null>(null);
    const [followerListing, setFollowerListing] = useState<Follower[]>([]);
    const [loadingFollowerListing, setLoadingFollowerListing] = useState(true);

    useEffect(() => {
        const getUserDataFE = async () => {
            const { User } = await getUserDataByUsername(profileusername.toString());
            console.log(User)
            setUser(User);
        }

        getUserDataFE();
    }, [profileusername]);

    useEffect(() => {
        if (!User) return;

        const getFollowersFE = async () => {
            const { follower } = await getFollowers(User.id);
            setFollowerListing(follower);
            setLoadingFollowerListing(false);
        }

        getFollowersFE();
    }, [User]);

    if (loadingFollowerListing) return <Loading />;

    console.log(followerListing)

    return(
        <>  
            <div className='container-fluid my-5'>
                {followerListing.map((follow, index) => {
                    return(
                        <div className='row justify-content-center' key={index}>
                            <div className='col-11 col-md-6 col-xl-4 my-2 border py-4'>
                                <Image 
                                    width={50}
                                    height={50}
                                    alt='prof-pic'
                                    src={follow.follower.profilepic.toString() || "https://lh3.googleusercontent.com/a/ACg8ocIximtuKu7QUkx_E5R9WctexXezRz5DLWX_3KRXJhQ3lebAGTLM=s96-c"}
                                />
                                <a className='text-decoration-none text-dark ms-2' href={"/profile/"+follow.follower.username}>{follow.follower.username}</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default FollowersListing;