// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login } from "@/services/login";
import { User } from "next-auth"; // Importe o tipo User

// Interface para a resposta da sua API de login
interface ApiLoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string; // Sua API já retorna 'name'
    email: string;
    telefone: string;
    creci?: string;
    tipo: 'corretor' | 'imobiliaria' | 'construtora';
  };
}

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials) {
          console.log("NextAuth: Sem credenciais.");
          return null;
        }

        const { email, password } = credentials;
        console.log(`NextAuth: Tentando autorizar: ${email}`); // LOG 1

        try {
          const response = await login(email, password) as ApiLoginResponse;

          // LOG 2: ESTE É O LOG MAIS IMPORTANTE!
          // VAI MOSTRAR O QUE A SUA API DE LOGIN REALMENTE RETORNOU
          console.log("NextAuth: Resposta do serviço de login:", JSON.stringify(response, null, 2));

          if (response && response.success) {
            console.log("NextAuth: Login bem-sucedido. Criando usuário da sessão."); // LOG 3
            // O objeto retornado aqui DEVE bater com a interface 'User'
            return {
              id: response.user.id.toString(),
              name: response.user.name,
              email: response.user.email,
              telefone: response.user.telefone,
              creci: response.user.creci,
              tipo: response.user.tipo,
              token: response.token
            };
          } else {
            // LOG 4: Se o login falhou
            console.warn(`NextAuth: Falha no login. Motivo: ${response?.message || 'Resposta nula ou sem success:true'}`);
            return null;
          }
        } catch (error) {
          console.error("NextAuth: ERRO FATAL na função authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 'user' só existe no primeiro login
      if (user) {
        // 'user' aqui é o objeto que 'authorize' retornou
        token.id = user.id;
        token.name = user.name ?? ''; // <-- CORRIGIDO para 'name'
        token.email = user.email ?? '';
        token.tipo = (user as any).tipo;
        token.token = (user as any).token;
        token.telefone = (user as any).telefone;
        token.creci = (user as any).creci;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string; // <-- CORRIGIDO para 'name'
        session.user.email = token.email as string;
        session.user.tipo = token.tipo;
        session.user.token = token.token as string;
        session.user.telefone = token.telefone as string;
        session.user.creci = token.creci as string;
      }
      return session;
    },
    // ... (seu callback signIn do Google) ...
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };