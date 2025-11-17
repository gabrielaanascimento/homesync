// src/app/chat/page.tsx
"use client";
import React from 'react';
import ChatApp from '@/components/chat/ChatApp';
import BrokerOnlyRoute from '@/components/BrokerOnlyRoute';

const App: React.FC = () => {
    return (
        <BrokerOnlyRoute>
            <div className="App">
                <ChatApp />
            </div>
        </BrokerOnlyRoute>
    );
}

export default App;