import {PrismaClient} from "@prisma/client";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";

const prisma = new PrismaClient();

export const GET = handleAuth();