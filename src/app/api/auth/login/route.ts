import { login } from "@/services/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const response = await login(email, password);

    // Verificação simplificada para propósitos de teste
    if (response) {
        console.log(response);
        
        const user = {id: response.id, email: response.email}

        return NextResponse.json(user, { status: 200 });
    } else {
        // Retorna um erro para login falhado
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
}