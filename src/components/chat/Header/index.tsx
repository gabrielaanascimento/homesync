import React from 'react';
import logo from '@/img/logoLogin.png'

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(246, 247, 255, 0.753)',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    color: '#0c0c0c',
    borderRadius: '10px 10px 0 0',
    fontSize: '1.4rem',
    height: '7rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const backButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  };

  const backButtonInnerStyle = {
    backgroundColor: '#2d6df6',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    border: 'none',
    transition: 'all 0.2s ease',
  };

  return (
    <div style={headerStyle}>
      
      <img src={logo.src} style={{ width: '5rem' }} alt="Home Sync Logo" onClick={() => window.history.back()} />
    </div>
  );
};

export default Header;