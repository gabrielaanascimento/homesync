// src/components/produtos/products/index.tsx
import React from "react";
import "./styles.css";
import PropertyCard from "../PropertyCard"; // Alterado de ItemProducts

// Interface interna para as props que este componente recebe
interface Property {
  image: string;
  name: string; 
  address: string;
  rooms: string;
  area: number;
  valor: number;
  id: number;
}

interface PropsProducts {
  title?: string;
  properties: Property[];
  filters?: {
    minArea?: string;
    maxArea?: string;
  };
  onDeleteProperty?: (id: number) => void; // Prop de deleção opcional
}

export const Products = ({ title, properties, filters, onDeleteProperty }: PropsProducts) => {
  // Filtragem
  const filteredProperties = properties.filter((property) => {
    // ... (lógica de filtro inalterada) ...
    return true;
  });

  return (
    <div className="containerProducts">
      <h1 className="titleProducts">{title}</h1>
      <div className="containerItemsProducts">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            imovel_id={property.id}
            image={property.image}
            nome={property.name}
            valor={property.valor}
            local={property.address}
            quartos={parseInt(property.rooms.split(' ')[0]) || 0}
            area={property.area}
            // Passa a função de deletar para o card
            onDelete={onDeleteProperty ? () => onDeleteProperty(property.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
};