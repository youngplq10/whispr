import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import FormSetUsername from '@/app/components/FormSetUsername'

const page = async () => {
    const prisma = new PrismaClient();

    const { isAuthenticated, getUser } = getKindeServerSession()
    const user = getUser();
    const isLoggedIn = await isAuthenticated()

    if(!isLoggedIn){
        redirect("/")
    }
    
    const User = await prisma.user.findUnique({
        where: {
            kindeId: (await user).id
        }
    })

    if (User?.isUsernameSet === true){
        redirect("/dashboard")
    }

    return(
        <>
            <FormSetUsername />
        </>
    )
}

export default page