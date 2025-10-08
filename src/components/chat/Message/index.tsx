import React from 'react';
import RecommendedPropertiesList from '../RecommendedPropertiesList';

interface Imovel {
  id: number;
  nome: string;
  descricao: string;
  imageUrl: string;
}

interface MessageData {
  type: 'user' | 'bot' | 'loading';
  text: string;
  imoveis?: Imovel[];
}

interface MessageProps {
  message: MessageData;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const userMessageStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '10px',
    margin: '0',
    maxWidth: '80%',
    textAlign: 'right',
    backgroundColor: '#949494',
    color: '#fff',
  };

  const botMessageStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '10px',
    margin: '0',
    maxWidth: '80%',
    textAlign: 'left',
    backgroundColor: '#cccccc',
    color: '#0c0c0c',
  };

  const loadingStyle: React.CSSProperties = {
    borderRadius: '10px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '80%',
    minHeight: '40px',
    boxSizing: 'border-box',
    textAlign: 'left',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const loadingImgStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    display: 'block',
  };

  const messageWrapperStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    margin: '0',
    padding: '0',
  };

  if (message.type === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p style={userMessageStyle}>{message.text}</p>
      </div>
    );
  }

  if (message.type === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={loadingStyle}>
          <img src="https://cdn.pixabay.com/animation/2023/11/30/10/11/10-11-02-622_512.gif" style={loadingImgStyle} alt="Carregando..." />
        </div>
      </div>
    );
  }

  if (message.type === 'bot' && message.imoveis) {
    const combinedStyle: React.CSSProperties = {
      ...botMessageStyle,
      ...messageWrapperStyle,
      backgroundColor: '#949494',
      borderRadius: '20px',
      padding: '15px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      color: '#0c0c0c',
    };
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={combinedStyle}>
          <RecommendedPropertiesList
            introMessage={message.text}
            imoveis={message.imoveis}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <p style={botMessageStyle}>{message.text}</p>
    </div>
  );
};

export default Message;