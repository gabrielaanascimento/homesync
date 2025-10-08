import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, User, Account, Profile } from "next-auth";
import { redirect } from "next/navigation";

// Define a interface para o objeto de usuário retornado pela API
interface AuthUser extends User {
  id: string;
  nivel: string;
  email: string;
}

// Define a interface para as credenciais esperadas
interface AuthCredentials {
  email: string;
  password: string;
}

// Define a interface para a sessão, estendendo a padrão para incluir id e nivel
interface AuthSession extends Session {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
    id: string;
    nivel: string;
  };
}

async function checkIfEmailExistsInDatabase(email: string): Promise<boolean> {
  return email === "gabrielaugustoassisnascimento@gmail.com";
}

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as AuthCredentials;

        try {
          const response = await fetch(`${process.env.NEXTAUTH_URL || "https://next-wwx4.vercel.app"}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          });

          if (response.ok) {
            const user = await response.json();
            console.log(user);
            return user as AuthUser;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication failed:", error);
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
      if (user) {
        const authUser = user as AuthUser;
        token.id = authUser.id;
        token.nivel = authUser.nivel;
        token.email = authUser.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const authSession = session as AuthSession;
        authSession.user.id = token.id as string;
        authSession.user.nivel = token.nivel as string;
        authSession.user.email = token.email as string;
      }
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const userEmail = user.email;
        if (userEmail) {
          const emailExists = await checkIfEmailExistsInDatabase(userEmail);

          if (!emailExists) {
            return `/login`;
          }
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
