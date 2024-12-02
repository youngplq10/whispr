"use server"

import EditProfileForm from '@/app/components/EditProfileForm';
import Navbar from '@/app/components/Navbar';
import React from 'react';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = async () => {
    await checkIfIsLoggedOrHasUsername()

    return(
        <>
            <Navbar />
            <EditProfileForm />
        </>
    );
}

export default page;