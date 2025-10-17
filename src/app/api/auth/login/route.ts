import { login } from "@/services/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const response = await login(email, password);

    // Verifica se a resposta da API e o objeto 'user' existem
    if (response && response.user) {
        console.log("API Response User:", response.user);
        
        // Retorna APENAS o objeto de usuário para o NextAuth
        return NextResponse.json(response.user, { status: 200 });
    } else {
        // Retorna um erro para login falhado
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
}