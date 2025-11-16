// src/app/chat/page.tsx
"use client";
import React from 'react';
import ChatApp from '@/components/chat/ChatApp';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper'; // 1. IMPORTAR

const App: React.FC = () => {
    // 2. ENVOLVER A PÁGINA
    return (
        <PrivateRouteWrapper>
            <div className="App">
                <ChatApp />
            </div>
        </PrivateRouteWrapper>
    );
}

export default App;