"use server"

import React from 'react';
import FormSetUsername from '@/app/components/FormSetUsername';
import checkIfIsLoggedOrHasUsername from "@/app/server/checkIfIsLoggedOrHasUsername";

const page = async () => {
    checkIfIsLoggedOrHasUsername()

    return(
        <>
            <FormSetUsername />
        </>
    );
}

export default page;