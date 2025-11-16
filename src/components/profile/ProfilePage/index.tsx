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
import "./ProfilePage.css"; 
import EditarPerfil from "../EditProfile"; // O componente em si
import { signOut } from "next-auth/react";
import { Products } from "@/components/produtos/products"; 

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ProductItem {
  id: number; 
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number;
}

export interface ProfilePageProps {
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
  userProperties: ProductItem[];
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
  userProperties,
}) => {
  // (Lógica do gráfico inalterada)
  const dadosGrafico = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Vendas (R$)",
        data: salesData || [80, 95, 70, 110, 90, 100, 125, 98, 113, 102],
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
          <nav className="menu">
            <a href="/chat">Chat IA</a>
            <a href="/imovel/cadastro">Cadastrar Imóvel</a>
            
            {/* 1. COMPONENTE MOVIDO PARA CÁ E USANDO A NOVA PROP */}
            <EditarPerfil 
              renderButton={(openModal) => (
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault(); // Previne o link de navegar
                    openModal();        // Abre o modal
                  }}
                  // Estilo idêntico aos outros <a> do menu
                  className="menu-button-style"
                >
                  Editar Perfil
                </a>
              )}
            />
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
          <Products title="Meus Imóveis" properties={userProperties} />
        </div>

        {/* 3. <EditarPerfil /> FOI REMOVIDO DAQUI */}

        {/* 4. REVIEWS DINÂMICAS */}
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