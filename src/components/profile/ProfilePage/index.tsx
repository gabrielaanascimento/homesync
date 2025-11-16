// src/components/profile/ProfilePage/index.tsx
"use client";

import React from "react";
// ... (outros imports)
import "./ProfilePage.css"; 
import EditarPerfil from "../EditProfile";
import { signOut } from "next-auth/react";
import { Products } from "@/components/profile/Products";

// ... (imports do ChartJS)

interface ProductItem {
  id: number; // 1. ADICIONAR ID AQUI
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number;
}

export interface ProfilePageProps {
  // ... (outros campos: name, title, photo, etc.)
  name: string;
  title: string;
  photo: string;
  reviews: { client: string; comment: string; stars: number }[];
  salesData?: number[];
  email: string;
  creci: string;
  celular?: string;
  totalSales: number; 
  averageSales: number;
  rating: number;
  
  userProperties: ProductItem[]; // 2. Esta interface agora inclui o ID
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  name,
  title,
  photo,
  reviews,
  salesData,
  email,
  creci,
  celular,
  userProperties, // 3. A lista de imóveis (com ID)
}) => {
  // ... (Lógica do gráfico e do sidebar inalterada) ...
  // ...

  return (
    <div className="container">
      {/* Sidebar (inalterado) */}
      <aside className="sidebar">
        <div>
          <h2>Corretor+</h2>
          <div className="profile">
            <img src={photo} alt={`Foto de ${name}`} />
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
          <nav className="menu">
            <a href="/chat">Chat IA</a>
            <a href="/imovel/cadastro">Cadastrar Imóvel</a>
          </nav>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="logout"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main">
        {/* 1. Cards de Contato */}
        <div className="cards">
          {/* ... (cards de email, creci, celular) ... */}
          <div className="card">
            <h3>Email</h3>
            <p style={{ fontSize: '1rem' }}>{email}</p> 
          </div>
          <div className="card">
            <h3>CRECI</h3>
            <p>{creci}</p>
          </div>
          <div className="card">
            <h3>Telefone</h3>
            <p>{celular || 'Não cadastrado'}</p>
          </div>
        </div>
        
        {/* 2. GALERIA DE IMÓVEIS */}
        <div className="properties-gallery">
          {/* 4. Passa a lista de imóveis (com ID) para o componente */}
          <Products title="Meus Imóveis" properties={userProperties} />
        </div>

        {/* 3. Botão "Editar Perfil" */}
        <EditarPerfil />

        {/* 4. REVIEWS DINÂMICAS */}
        <div className="reviews">
          <h3>Avaliações Recentes</h3>
          {/* ... (lógica de renderização das reviews) ... */}
          {reviews.length > 0 ? (
            reviews.map((rev, i) => (
              <div key={i} className="review">
                <strong>{rev.client}</strong>
                <p>"{rev.comment}"</p>
                <div className="stars">{"⭐".repeat(rev.stars)}</div>
              </div>
            ))
          ) : (
            <p style={{textAlign: 'center', color: '#555'}}>Nenhuma avaliação encontrada.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;