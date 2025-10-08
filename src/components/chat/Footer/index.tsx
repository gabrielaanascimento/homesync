import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';


interface FooterProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onClearChat: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSendMessage, isLoading, onClearChat }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const footerStyle: React.CSSProperties = {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  };

  const caixaTextStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '1.5rem',
    padding: '4px',
    boxSizing: 'border-box',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  };

  const inputStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    padding: '12px 15px',
    borderRadius: '16px',
    fontSize: '1rem',
    flexGrow: '1',
    marginRight: '8px',
    minHeight: '48px',
    backgroundColor: 'transparent',
    color: '#0c0c0c',
  };

  const buttonStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '7rem',
    width: '2.5rem',
    height: '2.5rem',
    whiteSpace: 'nowrap',
    marginRight: '1%',
    backgroundColor: '#2d6df6',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const clearButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f62d6d',
    marginRight: '10px'
  };


  return (
    <form onSubmit={handleSubmit}>
      <div style={footerStyle}>
        <div style={caixaTextStyle}>
          <button type="button" onClick={onClearChat} style={clearButtonStyle} disabled={isLoading}>
            <Trash2 />
          </button>
          <input
            type="text"
            id="message-input"
            placeholder="Pergunte aqui..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} disabled={isLoading}>
            <Send />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Footer;