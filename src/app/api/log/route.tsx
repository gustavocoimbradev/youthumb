import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        // Imprimir o valor da variável de ambiente
        console.log("DATABASE_URL:", process.env.DATABASE_URL);

        const url = new URL(req.url);
        const action = `${url.searchParams.get('action')}`;
        const forwardedFor = req.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : 'IP não encontrado';

        console.log("Received action:", action);
        console.log("IP address:", ip);

        const insert = await prisma.log.create({
            data: {
                action: action,
                ip: ip,
            }
        });

        console.log("Log inserted:", insert);

        return NextResponse.json(insert);

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating log:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    }
}
