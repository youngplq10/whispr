"use server"

import EditPostForm from '@/app/components/EditPostForm';
import Navbar from '@/app/components/Navbar';
import React from 'react';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = async () => {
    checkIfIsLoggedOrHasUsername()

    return(
        <>
            <Navbar />
            <EditPostForm />
        </>
    );
}

export default page;