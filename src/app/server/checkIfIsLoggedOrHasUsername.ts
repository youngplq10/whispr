"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const checkIfIsLoggedOrHasUsername = async () => {
    const prisma = new PrismaClient();
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = getUser();
    const isLoggedIn = await isAuthenticated();

    if(!isLoggedIn){
        redirect("/");
    }

    const User = await prisma.user.findUnique({
        where: {
            kindeId: (await user).id
        }
    });

    if(!User){
        redirect("/api/auth/success");
    }

    if(User?.isUsernameSet === false){
        redirect("/set/username");
    }
}

export default checkIfIsLoggedOrHasUsername;