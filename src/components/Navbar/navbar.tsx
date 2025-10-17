"use client";

import { FC, useState } from "react";
import Image from "next/image";
import IconLogo from "../Navbar/icones/HS.png";
import IconChat from "../Navbar/icones/chat.png";
import IconPerfil from "../Navbar/icones/perfil.png";
import IconMenu from "../Navbar/icones/menu.png";
import { signOut } from "next-auth/react";

interface NavbarProps {
  id?: string;
}

const Navbar: FC<NavbarProps> = ({ id }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav style={styles.navbar}>
        {/* Logo */}
        <div
          style={styles.logo}
          onClick={() => (window.location.href = "/produtos")}
        >
          <Image
            src={IconLogo.src}
            alt="Logo"
            width={50}
            height={50}
          />
        </div>

        {/* Ícones da direita */}
        <div style={styles.icons}>
          <Image
            src={IconChat.src}
            alt="Chat"
            width={38}
            height={38}
            style={styles.icon}
            onClick={() => (window.location.href = "/chat")}
          />
          <Image
            src={IconPerfil.src}
            alt="User"
            width={38}
            height={38}
            style={styles.icon}
            onClick={() => (window.location.href = `/profile/corretor/${id}`)}
          />
          <Image
            src={IconMenu.src}
            alt="Menu"
            width={38}
            height={38}
            style={styles.icon}
            onClick={toggleMenu} // Evento de clique para abrir/fechar o menu
          />
        </div>
      </nav>

      {/* Overlay para escurecer o fundo quando o menu está aberto */}
      {isMenuOpen && <div style={styles.overlay} onClick={toggleMenu}></div>}

      {/* Menu Lateral */}
      <div style={{...styles.sideMenu, transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <a href="/imovel/cadastro" style={styles.menuItem}>Cadastrar Imóvel</a>
        <a href="/chat" style={styles.menuItem}>Chat</a>
        <a href={`/profile/corretor/${id}`} style={styles.menuItem}>Perfil</a>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    height: "70px",
    width: "600px",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderRadius: "58px",
    position: 'relative',
    zIndex: 1100, // z-index alto para a navbar
  },
  logo: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  icon: {
    cursor: "pointer",
  },
  // Estilos para o menu lateral
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1002,
  },
  sideMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: '280px',
    backgroundColor: '#ffffff',
    boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
    zIndex: 1003,
    transition: 'transform 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    padding: '100px 20px 40px 20px',
    alignItems: 'flex-start',
    gap: '15px',
  },
  menuItem: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    padding: '12px 15px',
    width: '100%',
    textAlign: 'left',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
    fontWeight: 500,
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    fontSize: '18px',
    padding: '12px 15px',
    marginTop: 'auto',
    color: '#dc2626',
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  }
};

export default Navbar;