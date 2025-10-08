import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, email, password, age, address, phone } = await request.json();

    if (!name || !email || !password || !age || !address) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
}