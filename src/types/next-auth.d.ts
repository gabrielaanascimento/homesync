// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Estende o tipo de sessão padrão do NextAuth
   * para incluir propriedades customizadas.
   */
  interface Session {
    user: {
      id: string;
      nome: string;
      email: string;
      telefone: string;
      creci: string;
    } & DefaultSession["user"];
  }

  /**
   * Estende o tipo de usuário padrão para incluir
   * as propriedades customizadas do objeto retornado
   * pela função `authorize`.
   */
  interface User extends DefaultUser {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    creci: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Estende o token JWT para incluir propriedades customizadas.
   */
  interface JWT {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    creci: string;
  }
}