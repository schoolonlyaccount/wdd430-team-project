import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId, sessionId, isAuthenticated: authenticated } = await auth();

    return NextResponse.json({
        authenticated,
        userId,
        sessionId
    });
}