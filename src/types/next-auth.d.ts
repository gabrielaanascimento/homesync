// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Tipo do seu backend
type TipoUsuario = 'corretor' | 'imobiliaria' | 'construtora';

declare module "next-auth" {
  /**
   * Estende o tipo de sessão
   */
  interface Session {
    user: {
      id: string;
      name: string; // <-- CORRIGIDO para 'name' (com "a")
      email: string;
      telefone: string;
      creci?: string;
      tipo: TipoUsuario; // <-- ADICIONADO
      token: string;     // <-- ADICIONADO
    } & DefaultSession["user"];
  }

  /**
   * Estende o tipo de usuário
   */
  interface User extends DefaultUser {
    id: string;
    name: string; // <-- CORRIGIDO para 'name' (com "a")
    email: string;
    telefone: string;
    creci?: string;
    tipo: TipoUsuario; // <-- ADICIONADO
    token: string;     // <-- ADICIONADO
  }
}

declare module "next-auth/jwt" {
  /**
   * Estende o token JWT
   */
  interface JWT {
    id: string;
    name: string; // <-- CORRIGIDO para 'name' (com "a")
    email: string;
    telefone: string;
    creci?: string;
    tipo: TipoUsuario; // <-- ADICIONADO
    token: string;     // <-- ADICIONADO
  }
}