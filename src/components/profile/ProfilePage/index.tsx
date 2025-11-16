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
import "./ProfilePage.css"; // o CSS adaptado que coloco abaixo
import EditarPerfil from "../EditProfile/EditProfile";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export interface Contact {
  type: string;
  label: string;
  value: string;
  link: string;
}

export interface ProfilePageProps {
  name: string;
  title: string;
  photo: string;
  totalSales: number;
  averageSales: number;
  rating: number;
  reviews: { client: string; comment: string; stars: number }[];
  contacts?: Contact[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  name,
  title,
  photo,
  totalSales,
  averageSales,
  rating,
  reviews,
}) => {
  const dadosGrafico = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Vendas (R$)",
        data: [80000, 95000, 70000, 110000, 90000, 100000, 125000, 98000, 113000, 102000],
        backgroundColor: "#1d3fffcc",
        borderRadius: 8,
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#555" },
      },
      x: {
        ticks: { color: "#555" },
      },
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
            <p>{totalSales}</p>
          </div>
          <div className="card">
            <h3>Média de Vendas</h3>
            <p>R$ {averageSales.toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Avaliação Geral</h3>
            <p>⭐ {rating} / 5</p>
          </div>
        </div>

        <div className="chart">
          <h3>Desempenho Mensal</h3>
          <Bar data={dadosGrafico} options={opcoesGrafico} />
        </div>

        <div className="reviews">
          <h3>Avaliações Recentes</h3>
          {reviews.map((rev, i) => (
            <div key={i} className="review">
              <strong>{rev.client}</strong>
              <p>"{rev.comment}"</p>
              <div className="stars">{"⭐".repeat(rev.stars)}</div>
            </div>
          ))}
        </div>
        <div className="EditProfile">
          <EditarPerfil />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
