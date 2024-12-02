"use server"

import Navbar from '@/app/components/Navbar';
import UsersProfileInfo from '@/app/components/UsersProfileInfo';
import React from 'react';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = async () => {
    await checkIfIsLoggedOrHasUsername()

    return(
        <>
            <Navbar />
            <UsersProfileInfo />
        </>
    );
}

export default page;