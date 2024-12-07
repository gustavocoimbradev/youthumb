import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req:Request) {
    const url = new URL(req.url);
    const action = `${url.searchParams.get('action')}`;  
    const ip = req.headers.get('x-forwarded-for') || 'IP não encontrado';  
    const insert = await prisma.log.create({
        data: {
            action: action,  
            ip: ip          
        }
    });
    return NextResponse.json(insert);
}


