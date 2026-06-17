import {PrismaPg} from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function CreatePrismaClient(){
    const url = process.env.DATABASE_URL;
    if(!url){
        throw new Error("Database URL not found");

    }


    const adapter = new PrismaPg({connectionString: url});
    return new PrismaClient({adapter});
}

export const prisma = globalForPrisma.prisma ?? CreatePrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}