// src/components/produtos/PropertyCard/index.tsx
"use client";
import "./styles.css";
import { Property } from "@/types/property";
import IconPin from "../img/pin.png";
import IconQuartos from "../img/quartos.png"; // Corrigido (estava imgimg)
import IconRegua from "../img/regua.png";
import { Trash2 } from "lucide-react"; 

type PropertyCardProps = Pick<
  Property,
  | "imovel_id" 
  | "image"
  | "nome"
  | "valor"
  | "local"
  | "quartos"
  | "area"
> & {
  onDelete?: () => void;
  userType?: 'corretor' | 'imobiliaria' | 'construtora'; // 1. TIPO DE USUÁRIO ADICIONADO
};

export default function PropertyCard({
  image,
  nome,
  valor,
  local,
  quartos,
  area,
  imovel_id, 
  onDelete,
  userType, // 2. TIPO RECEBIDO
}: PropertyCardProps) {

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (onDelete) {
      onDelete(); 
    }
  };

  return (
    <div
      className="property-card"
      onClick={() => (window.location.href = `/imovel/${imovel_id}`)}
      rel="noopener noreferrer"
    >
      <div className="property-image-container">
        <img src={image} alt={nome} className="property-image" />
        
        {/* 3. LÓGICA DE RENDERIZAÇÃO ATUALIZADA */}
        {onDelete && userType === 'imobiliaria' && (
          <button
            onClick={handleDeleteClick}
            className="delete-button" 
          >
            <Trash2 size={18} color="white" />
          </button>
        )}
      </div>
      <div className="property-content">
        {/* ... (resto do card inalterado) ... */}
        <h3 className="property-title">{nome}</h3>
        <p className="property-price">{valor ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "R$ 0"}</p>
        <div className="feature" style={{ marginBottom: "0.75rem" }}>
          <img src={IconPin.src} alt="Localização" className="feature-icon" />
          <span>{local}</span>
        </div>
        <div className="property-features">
          <div className="feature">
            <img src={IconQuartos.src} alt="Quartos" className="feature-icon" />
            <span>{quartos} quartos</span>
          </div>
          <div className="feature">
            <img src={IconRegua.src} alt="Área" className="feature-icon" />
            <span>{area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}