// src/components/BrokerOnlyRoute.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface BrokerOnlyRouteProps {
  children: ReactNode;
}

export default function BrokerOnlyRoute({ children }: BrokerOnlyRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return; // Espera a sessão carregar
    }
    
    if (status === "unauthenticated") {
      router.push("/login"); // Redireciona se não estiver logado
      return;
    }

    // A REGRA PRINCIPAL:
    // Se estiver autenticado mas NÃO for corretor, volta para produtos
    if (status === "authenticated" && session.user.tipo !== 'corretor') {
      alert("Acesso negado. O Chat IA está disponível apenas para Corretores.");
      router.push("/produtos");
    }

  }, [status, session, router]);

  // Mostra loading enquanto verifica
  if (status === "loading" || (status === "authenticated" && session.user.tipo !== 'corretor')) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" />
        <p>Verificando permissões...</p>
      </div>
    );
  }

  // Se for autenticado E for corretor, mostra a página
  if (status === "authenticated" && session.user.tipo === 'corretor') {
    return <>{children}</>;
  }

  return null;
}

const styles: { [key: string]: React.CSSProperties } = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem',
    color: '#004EFF',
    gap: '1rem'
  }
};