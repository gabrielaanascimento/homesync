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
import EditarPerfilForm from "../EditProfile"; // Importa o formulário inline
import Comentarios from "../Comentarios"; // Importa o componente de comentários
import { signOut } from "next-auth/react";
import { Products } from "@/components/produtos/products"; 

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Interface para os imóveis
interface ProductItem {
  id: number; 
  image: string;
  name: string;
  address: string;
  rooms: string;
  area: number;
  valor: number;
}

// Interface completa para as props do componente
export interface ProfilePageProps {
  profileId: string; // Para o componente de Comentários
  userType: 'corretor' | 'imobiliaria' | 'construtora'; // Para lógica de permissão
  name: string;
  title: string;
  photo: string;
  reviews: { client: string; comment: string; stars: number }[];
  salesData?: number[];
  email: string;
  creci?: string; // Opcional (pode ser CNPJ)
  celular?: string;
  totalSales: number; 
  averageSales: number;
  rating: number;
  userProperties: ProductItem[];
  onDeleteProperty: (id: number) => void; // Função para deletar
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  profileId,
  userType,
  name,
  title,
  photo,
  reviews,
  salesData,
  email,
  creci,
  celular,
  userProperties,
  onDeleteProperty, 
}) => {
  // Lógica do gráfico
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
          <h2>HomeSync+</h2>
          <div className="profile">
            <img src={photo} alt={`Foto de ${name}`} />
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
          <nav className="menu">
            {userType === 'corretor' && (
             <a href="/chat">Chat IA</a>
            )}
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
          {creci && (
            <div className="card">
              <h3>{creci.length > 10 ? "CNPJ" : "CRECI"}</h3>
              <p>{creci}</p>
            </div>
          )}
          <div className="card">
            <h3>Telefone</h3>
            <p>{celular || 'Não cadastrado'}</p>
          </div>
        </div>
        
        {/* 2. GALERIA DE IMÓVEIS */}
        <div className="properties-gallery">
          <Products 
            title="Meus Imóveis" 
            properties={userProperties} 
            onDeleteProperty={onDeleteProperty}
            userType={userType} // Passa o tipo de usuário para o card
          />
        </div>

        {/* 3. FORMULÁRIO DE EDIÇÃO (INLINE) */}
        <div className="reviews"> {/* Reutilizando o estilo de card .reviews */}
          <EditarPerfilForm />
        </div>
        
        {/* 5. COMPONENTE DE COMENTÁRIOS */}
        <div className="comments-section">
           <Comentarios perfilId={profileId} />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;