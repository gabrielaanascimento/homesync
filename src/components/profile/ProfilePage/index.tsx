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
  totalSales: number;
  averageSales: number; // API não fornece, usaremos 0
  rating: number;
  // Prop de reviews agora é obrigatória para os dados dinâmicos
  reviews: { client: string; comment: string; stars: number }[];
  // Dados do gráfico (API não fornece, usaremos padrão)
  salesData?: number[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  name,
  title,
  photo,
  totalSales,
  averageSales,
  rating,
  reviews,
  salesData,
}) => {
  // Dados do gráfico: use os dados passados ou um fallback estático
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
            {/* DADOS DINÂMICOS */}
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
        <div className="cards">
          <div className="card">
            <h3>Total de Vendas</h3>
            {/* DADO DINÂMICO */}
            <p>{totalSales}</p>
          </div>
          <div className="card">
            <h3>Média de Vendas</h3>
            {/* DADO DINÂMICO (com padrão) */}
            <p>R$ {averageSales.toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Avaliação Geral</h3>
            {/* DADO DINÂMICO */}
            <p>⭐ {rating.toFixed(2)} / 5</p>
          </div>
        </div>

        <EditarPerfil />

        {/* REVIEWS DINÂMICAS */}
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
      </main>
    </div>
  );
};

export default ProfilePage;