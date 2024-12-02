"use server"

import React from 'react';
import Navbar from '@/app/components/Navbar';
import FormNewPost from '@/app/components/FormNewPost';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = async () => {
    await checkIfIsLoggedOrHasUsername();

    return(
        <>
            <Navbar />
            <FormNewPost />
        </>
    );
}

export default page;