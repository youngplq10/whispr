"use server"

import FollowersListing from '@/app/components/FollowersListing';
import Navbar from '@/app/components/Navbar';
import React from 'react';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = () => {
    checkIfIsLoggedOrHasUsername()

    return(
        <>
            <Navbar />
            <FollowersListing />
        </>
    );
}

export default page;