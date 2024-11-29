"use server"

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient()

export async function setUsername(username: string, userid: string){

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

    await prisma.post.create({
        data: {
            content: contentt,
            userId: userid,
            username: usernamee,
        },
    })
}

export async function getAllPosts(){

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

export async function getUserDataByUsername(username: string){

    const User = await prisma.user.findUnique({
        where: {
            username: username
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

export async function updateUsername(new_username: string, userid: string){

    await prisma.user.update({
        where: {
            kindeId: userid
        },
        data: {
            username: new_username
        }
    })

    redirect("/profile")
}

export async function updateBio(new_bio: string, userid: string){

    await prisma.user.update({
        where: {
            kindeId: userid
        },
        data: {
            bio: new_bio
        }
    })

    redirect("/profile")
}

export async function getPostData(postId: string){

    const Post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    return {
        PostData: Post
    }
}

export async function updatePost(postId: string, new_content: string){

    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            content: new_content
        }
    })

    redirect('/profile')
}
export async function checkIfIsFollowing(authenticatedUserId: string, targetUsername: string) {

    const targetUser = await prisma.user.findUnique({
      where: { username: targetUsername },
    });
  
    if (!targetUser) {
      throw new Error("Target user not found");
    }
  
    const following = await prisma.follower.findFirst({
      where: {
        followerId: authenticatedUserId,
        followingId: targetUser.id,
      },
    });
  
    return {
        isFollowing: Boolean(following)
    }
  }

export async function followUser(followerId: string, followingUsername: string){

    const followingUser = await prisma.user.findUnique({
        where: {
            username: followingUsername
        }
    })

    if(!followingUser) {
        throw "f followuser"
    }

    await prisma.follower.create({
        data: {
            followerId: followerId,
            followingId: followingUser.id
        }
    })
}

export async function unfollowUser(followerId: string, followingUsername: string){

    const followingUser = await prisma.user.findUnique({
        where: {
            username: followingUsername
        }
    })

    if(!followingUser) {
        throw "f followuser"
    }

    await prisma.follower.deleteMany({
        where: {
            followerId: followerId,
            followingId: followingUser.id
        }
    })
}

export async function getFollowing(userId: string){

    const following = await prisma.follower.findMany({
        where: {
            followerId: userId
        },
        select: {
            follower: {
              select: {
                id: true,
                username: true,
                profilepic: true,
                bio: true,
            },
        },
    }
    })

    return {
        following: following
    }
}