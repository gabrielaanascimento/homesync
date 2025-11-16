// src/components/PrivateRouteWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface PrivateRouteWrapperProps {
  children: ReactNode;
}

export default function PrivateRouteWrapper({ children }: PrivateRouteWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={40} color="#004EFF" />
        <p>Carregando sessão...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    return <>{children}</>;
  }

  // Permanece nulo enquanto redireciona
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