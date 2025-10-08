// Next-main/src/components/produtos/PropertyList/index.tsx
"use client";
import PropertyCard from "../PropertyCard";
import "./styles.css";
import { Property } from "@/types/property";

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  return (
    <div className="property-list-container">
      {properties.length > 0 ? (
        <div className="property-list-grid">
          {properties.map((property) => (
            <div key={property.id} className="property-card-wrapper">
              <PropertyCard
                // CAMPOS DE DISPLAY (Incluindo imovel_id para navegação)
                image={property.image}
                nome={property.nome}
                valor={property.valor || 0}
                local={property.local}
                quartos={property.quartos || 0}
                area={property.area || 0}
                imovel_id={property.imovel_id} // CORREÇÃO: Passando o ID de navegação
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-properties-message">
          <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
}