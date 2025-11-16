// src/app/api/auth/login/route.ts
import { login } from "@/services/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // O serviço de login agora chama a API backend
    const response = await login(email, password); //

    // A resposta do backend (data.body) é { success, message, token, user }
    if (response && response.success) {
        
        // Retorna o objeto { user, token } para o NextAuth
        return NextResponse.json({ 
            user: response.user, 
            token: response.token 
        }, { status: 200 });
    } else {
        // Retorna um erro
        const message = response?.message || "Credenciais inválidas";
        return NextResponse.json({ error: message }, { status: 401 });
    }
}