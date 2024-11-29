"use server"

import FollowingListing from '@/app/components/FollowingListing';
import Navbar from '@/app/components/Navbar';
import React from 'react';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = () => {
    checkIfIsLoggedOrHasUsername()

    return(
        <>
            <Navbar />
            <FollowingListing />
        </>
    );
}

export default page;