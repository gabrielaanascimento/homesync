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
import { signOut } from "next-auth/react";
// 1. IMPORTAR O COMPONENTE DE PRODUTOS
import { Products } from "@/components/produtos/products";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 2. TIPO PARA A PROPRIEDADE (ESPERADO PELO COMPONENTE 'Products')
interface ProductItem {
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number;
}

// Interface para as props do componente
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
  
  // 3. ADICIONAR A NOVA PROP DE IMÓVEIS
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
  // 4. RECEBER A PROP DE IMÓVEIS
  userProperties,
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
        
        {/* 2. GALERIA DE IMÓVEIS (NOVA SEÇÃO) */}
        <div className="properties-gallery">
          <Products title="Meus Imóveis" properties={userProperties} />
        </div>

        {/* 3. Botão "Editar Perfil" (já existia, apenas movido) */}
        <EditarPerfil />

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