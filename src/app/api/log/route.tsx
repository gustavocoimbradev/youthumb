import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const action = `${url.searchParams.get('action')}`;
        const forwardedFor = req.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : 'IP não encontrado';
        const insert = await prisma.log.create({
            data: {
                action: action,
                ip: ip,
            }
        });
        return NextResponse.json(insert);
    } catch (error) {
        console.error("Error creating log:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
