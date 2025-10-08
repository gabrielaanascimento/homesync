"use client";
import React from 'react';
import ChatApp from '@/components/chat/ChatApp';
import { useSession } from 'next-auth/react';

const App: React.FC = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Carregando sessão...</p>;
    }

    if (status === "authenticated") {
        return (
            <div className="App">
                <ChatApp />
            </div>
        );
    }

    // Redireciona se não houver autenticação
    window.location.href = '/login';
    return null; // Retorna null para evitar a renderização antes do redirecionamento
}

export default App;