// Next-main/src/components/produtos/PropertyCard/index.tsx
"use client";
import "./styles.css";
import { Property } from "@/types/property";
import IconPin from "../img/pin.png";
import IconQuartos from "../img/quartos.png";
import IconRegua from "../img/regua.png";

// Usa 'Pick' para incluir apenas os campos necessários, incluindo o 'imovel_id' para navegação.
type PropertyCardProps = Pick<
  Property,
  | "imovel_id" // Adicionado para navegação
  | "image"
  | "nome"
  | "valor"
  | "local"
  | "quartos"
  | "area"
  // Omitindo outros campos não visuais: id, corretor_id, status, tipo_imovel, endereco
>;

export default function PropertyCard({
  image,
  nome,
  valor,
  local,
  quartos,
  area,
  imovel_id, // Adicionado aqui
}: PropertyCardProps) {
  return (
    <div
      className="property-card"
      // CORREÇÃO: Usar o imovel_id para a navegação
      onClick={() => (window.location.href = `/imovel/${imovel_id}`)}
      rel="noopener noreferrer"
    >
      <div className="property-image-container">
        <img src={image} alt={nome} className="property-image" />
      </div>
      <div className="property-content">
        <h3 className="property-title">{nome}</h3>

        <p className="property-price">{valor ? valor : "R$ 0"}</p>

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