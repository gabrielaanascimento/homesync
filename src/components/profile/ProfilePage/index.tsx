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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Interface para as props do componente
export interface ProfilePageProps {
  name: string;
  title: string;
  photo: string;
  reviews: { client: string; comment: string; stars: number }[];
  salesData?: number[];
  
  // --- CAMPOS ATUALIZADOS ---
  // Adicione os novos campos que você quer exibir
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
  // --- CAMPOS ATUALIZADOS ---
  // Receba os novos campos aqui
  email,
  creci,
  celular,
  // (Campos antigos ainda são recebidos, mas não serão usados nos cards)
  totalSales,
  averageSales,
  rating,
}) => {
  // Dados do gráfico (lógica inalterada)
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
      {/* Sidebar (inalterada) */}
      <aside className="sidebar">
        <div>
          <h2>Corretor+</h2>
          <div className="profile">
            <img src={photo} alt={`Foto de ${name}`} />
            <h3>{name}</h3>
            <p>{title}</p>
          </div>

          <nav className="menu">
            <a href="#">Perfil</a>
            <a href="#">Minhas Vendas</a>
            <a href="#">Avaliações</a>
            <a href="#">Configurações</a>
          </nav>
        </div>
        <a href="#" className="logout">Sair</a>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main">
        {/* --- SEÇÃO DE CARDS ATUALIZADA --- */}
        <div className="cards">
          <div className="card">
            <h3>Email</h3>
            {/* DADO DINÂMICO NOVO */}
            <p style={{ fontSize: '1rem' }}>{email}</p> 
          </div>
          <div className="card">
            <h3>CRECI</h3>
            {/* DADO DINÂMICO NOVO */}
            <p>{creci}</p>
          </div>
          <div className="card">
            <h3>Telefone</h3>
            {/* DADO DINÂMICO NOVO */}
            <p>{celular || 'Não cadastrado'}</p>
          </div>
        </div>
        {/* --- FIM DA SEÇÃO ATUALIZADA --- */}


        <EditarPerfil />

        {/* REVIEWS DINÂMICAS (inalterado) */}
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
        <div className="EditProfile">
          {/* //Editar dados  */}
          <EditarPerfil />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;