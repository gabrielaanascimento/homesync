import { login } from "@/services/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const response = await login(email, password);

    // Verificação para garantir que a resposta e o objeto de usuário existam
    if (response && response.user) {
        console.log("API Response:", response);
        // Retorna APENAS o objeto de usuário para o NextAuth
        return NextResponse.json(response.user, { status: 200 });
    } else {
        // Retorna um erro para login falhado
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
}