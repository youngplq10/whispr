"use client"

import React, { useEffect, useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { getUserData, updateUsername, updateBio } from '@/app/server/actions'
import Loading from '@/app/components/Loading'

const EditProfileForm = () => {
    const { user } = useKindeBrowserClient();

    const [loadingUserData, setLoadingUserData] = useState(true);

    const [usernameContent, setUsernameContent] = useState('');
    const [bioContent, setBioContent] = useState('');

    useEffect(() => {
        if (!user?.id) return;

        const getUserDataFE = async () => {
            try {
                const User = await getUserData(user.id);
                setUsernameContent(User.User.username || "");
                setBioContent(User.User.bio || "");
                setLoadingUserData(false);
            }
            catch {
                throw "f getuserdatafe";
            }
        }
        
        getUserDataFE();
    }, [user]);

    const handleUsernameContent = async () => {
        if (usernameContent.length  <= 0 ) {
            alert("Enter username");
            return;
        }
        try{
            await updateUsername(usernameContent, user?.id || "err");
        }
        catch {
            throw "f updateusername";
        }
    }

    const handleBioContent = async () => {
        if (bioContent.length <= 0) {
            alert("Enter bio");
            return;
        }
        try{
            await updateBio(bioContent, user?.id || "err");
        }
        catch {
            throw "f updatebio";
        }
    }

    if (loadingUserData) return <Loading />;

    return(
        <>
            <div className='container-fluid'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-11 col-md-6 col-xl-4'>
                        <div className="mb-3">
                            <label htmlFor="Username_input" className="form-label">Username</label>
                            <input type="text" className="form-control" id="Username_input" value={usernameContent} onChange={(e) => setUsernameContent(e.target.value)} />
                            <button className='btn btn-primary mt-2' onClick={handleUsernameContent}>Update</button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Bio_input" className="form-label">Bio</label>
                            <input type="text" className="form-control" id="Bio_input" value={bioContent} onChange={(e) => setBioContent(e.target.value)}  />
                            <button className='btn btn-primary mt-2' onClick={handleBioContent}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileForm;