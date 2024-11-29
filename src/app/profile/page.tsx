"use server"

import React from 'react';
import Navbar from '@/app/components/Navbar';
import ProfileInfo from '@/app/components/ProfileInfo';
import PostsOwnProfile from '@/app/components/PostsOwnProfile';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = async () => {
    checkIfIsLoggedOrHasUsername()

    return(
        <>
            <Navbar />
            <ProfileInfo />
            <PostsOwnProfile />
        </>
    );
}

export default page;