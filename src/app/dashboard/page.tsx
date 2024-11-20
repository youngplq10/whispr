import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Navbar from '../components/Navbar'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'


const page = async () => {
    const prisma = new PrismaClient();
    const { isAuthenticated, getUser } = getKindeServerSession()
    const user = getUser()
    const isLoggedIn = await isAuthenticated()

    if(!isLoggedIn){
        redirect("/")
    }

    const User = await prisma.user.findUnique({
        where: {
            kindeId: (await user).id
        }
    })

    if(User?.isUsernameSet === false){
        redirect("/set/username")
    }

    return(
        <>
            <Navbar />
        </>
    )
}

export default page