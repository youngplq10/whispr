import React from 'react'
import Navbar from '../components/Navbar'
import ProfileInfo from '../components/ProfileInfo'
import PostsOwnProfile from '../components/PostsOwnProfile'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
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

    if(!User){
        redirect("/api/auth/success")
    }

    if(User?.isUsernameSet === false){
        redirect("/set/username")
    }

    return(
        <>
            <Navbar />
            <ProfileInfo />
            <PostsOwnProfile />
        </>
    )
}

export default page