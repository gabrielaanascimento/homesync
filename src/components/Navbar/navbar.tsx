"use client";

import { FC } from "react";
import Image from "next/image";
import IconLogo from "../Navbar/icones/HS.png";
import IconChat from "../Navbar/icones/chat.png";
import IconPerfil from "../Navbar/icones/perfil.png";
import IconMenu from "../Navbar/icones/menu.png";
import { signOut, useSession } from "next-auth/react";

interface NavbarProps {
  id?: string; // id é opcional porque a sessão pode não estar carregada
}

const Navbar: FC<NavbarProps> = ({ id }: any) => {
  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div
        style={styles.logo}
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <Image
          src={IconLogo.src} // logo atualizada
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Ícones da direita */}
      <div style={styles.icons}>
        <Image
          src={IconChat.src} // ícone estrela atualizado
          alt="Chat"
          width={38}
          height={38}
          style={styles.icon}
          onClick={() => (window.location.href = "/chat")}
        />
        <Image
          src={IconPerfil.src} // ícone usuário atualizado
          alt="User"
          width={38}
          height={38}
          style={styles.icon}
          onClick={() => (window.location.href = `/profile/corretor/${id}`)}
        />
        <Image
          src={IconMenu.src} // ícone menu atualizado
          alt="Menu"
          width={38}
          height={38}
          style={styles.icon}
        />
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    height: "70px",
    width: "600px", // fixo
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderRadius: "58px",
  },

  logo: {
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
};

export default Navbar;
