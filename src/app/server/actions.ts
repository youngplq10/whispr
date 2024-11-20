"use server"

import { PrismaClient } from '@prisma/client';

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
}