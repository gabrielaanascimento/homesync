// src/components/produtos/products/index.tsx
import React from "react";
import "./styles.css";
import PropertyCard from "../PropertyCard"; // Alterado de ItemProducts

// Interface interna para as props que este componente recebe
interface Property {
  image: string;
  name: string; // Vem como 'name' do ProfilePage
  address: string; // Vem como 'address' do ProfilePage
  rooms: string; // Vem como 'rooms' (ex: "3 quartos")
  area: number;
  valor: number; // Adicionado
  id: number; // Adicionado
}

interface PropsProducts {
  title?: string;
  properties: Property[];
  filters?: {
    minArea?: string;
    maxArea?: string;
  };
}

export const Products = ({ title, properties, filters }: PropsProducts) => {
  // Filtragem
  const filteredProperties = properties.filter((property) => {
    const minArea = filters?.minArea ? parseInt(filters.minArea) : null;
    const maxArea = filters?.maxArea ? parseInt(filters.maxArea) : null;

    if (minArea !== null && property.area < minArea) return false;
    if (maxArea !== null && property.area > maxArea) return false;

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
            // Extrai o número da string "X quartos"
            quartos={parseInt(property.rooms.split(' ')[0]) || 0}
            area={property.area}
          />
        ))}
      </div>
    </div>
  );
};