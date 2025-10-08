import React, { useEffect, useRef } from 'react';
import Message from '../Message';

interface MessageData {
  type: 'user' | 'bot' | 'loading';
  text: string;
  imoveis?: any[]; // Tipo 'any' para flexibilidade
}

interface MessageHistoryProps {
  messages: MessageData[];
}

const MessageHistory: React.FC<MessageHistoryProps> = ({ messages }) => {
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [messages]);

  const historyStyle: React.CSSProperties = {
    padding: '1rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100%',
    flexGrow: '1',
  };

  return (
    <div style={historyStyle} ref={historyRef}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageHistory;