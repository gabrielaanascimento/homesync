// src/components/profile/ProfilePage/index.tsx
"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./ProfilePage.css"; // Seu CSS
import EditarPerfil from "../EditProfile";
import { signOut } from "next-auth/react"; // 1. IMPORTAR O SIGNOUT

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Interface para as props do componente
export interface ProfilePageProps {
  name: string;
  title: string;
  photo: string;
  reviews: { client: string; comment: string; stars: number }[];
  salesData?: number[];
  
  // --- CAMPOS ATUALIZADOS ---
  email: string;
  creci: string;
  celular?: string;

  // Campos antigos (removidos da visualização dos cards, mas mantidos na interface)
  totalSales: number; 
  averageSales: number;
  rating: number;
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
  totalSales,
  averageSales,
  rating,
}) => {
  // (Lógica do gráfico permanece inalterada...)
  const dadosGrafico = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Vendas (R$)",
        data: salesData || [80, 95, 70, 110, 90, 100, 125, 98, 113, 102], // Dados de fallback
        backgroundColor: "#1d3fffcc",
        borderRadius: 8,
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#555" } },
      x: { ticks: { color: "#555" } },
    },
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <h2>Corretor+</h2>
          <div className="profile">
            <img src={photo} alt={`Foto de ${name}`} />
            <h3>{name}</h3>
            <p>{title}</p>
          </div>

          {/* 2. MENU ATUALIZADO */}
          <nav className="menu">
            <a href="/chat">Chat IA</a>
            <a href="/imovel/cadastro">Cadastrar Imóvel</a>
          </nav>
        </div>
        
        {/* 3. BOTÃO SAIR FUNCIONAL */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="logout"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main">
        {/* Cards de Contato (inalterados desta vez) */}
        <div className="cards">
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

        {/* Botão "Editar Perfil" que abre o modal */}
        <EditarPerfil />

        {/* Reviews (inalterado) */}
        <div className="reviews">
          <h3>Avaliações Recentes</h3>
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
        
        {/* 4. SEÇÃO DUPLICADA REMOVIDA */}
      </main>
    </div>
  );
};

export default ProfilePage;