"use server"

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function setUsername(username: string, userid: string){
    const prisma = new PrismaClient()

    await prisma.user.update({
        where: {
            kindeId: userid
        },
        data: {
            isUsernameSet: true,
            username: username
        }
    })

    redirect("/dashboard")
}

export async function setNewPost(contentt: string, userid: string, usernamee: string){
    const prisma = new PrismaClient();

    await prisma.post.create({
        data: {
            content: contentt,
            userId: userid,
            username: usernamee,
        },
    })
}

export async function getAllPosts(){
    const prisma = new PrismaClient();

    const Posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return {
        AllPosts: Posts
    }
}

export async function getUserData(userid: string){
    const prisma = new PrismaClient()

    const User = await prisma.user.findUnique({
        where: {
            kindeId: userid
        },
        include: {
            followers: true,
            following: true,
            posts: true
        }
    })

    return {
        User: {
            ...User,
            followers: User?.followers.length,
            following: User?.following.length,
            posts: User?.posts.length
        }
    }
}

export async function getUsername(userid: string){
    const prisma = new PrismaClient()

    const User = await prisma.user.findUnique({
        where: {
            kindeId: userid
        },
        include: {
            followers: true,
            following: true,
            posts: true
        }
    })

    return {
        Username_call: User?.username
    }
}

export async function getUsersPosts(username: string){
    const prisma = new PrismaClient();

    const Posts = await prisma.post.findMany({
        where: {
            username: username
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return {
        UsersPosts: Posts
    }
}