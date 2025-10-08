import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, email, password, cnpj, address, phone } = await request.json();

    if (!name || !email || !password || !cnpj || !address || !phone) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
}