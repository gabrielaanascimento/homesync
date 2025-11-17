
"use client";
import React from 'react';
import ChatApp from '@/components/chat/ChatApp';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper'; 

const App: React.FC = () => {
    
    return (
        <PrivateRouteWrapper>
            <div className="App">
                <ChatApp />
            </div>
        </PrivateRouteWrapper>
    );
}

export default App;
