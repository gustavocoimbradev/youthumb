import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { action, complement } = await req.json();
        const forwardedFor = req.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : 'Unknown';
        const insert = await prisma.log.create({
            data: {
                action: action,
                complement: complement,
                ip: ip,
            }
        });
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

export async function GET() {
    try {
        const select = await prisma.log.findMany({
            select: {
              complement: true,
            },
            orderBy: {
              id: 'desc',
            },
            where: {
              action: 'get_thumbnail',
            },
        });
        const uniqueSelect = select.filter((value, index, self) => 
            index === self.findIndex((t) => (
              t.complement === value.complement
            ))
        );
        const limitedSelect = uniqueSelect.slice(0, 4);
        return NextResponse.json(limitedSelect);          
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error retriaving log:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
    }
}


